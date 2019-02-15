import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max, extent, histogram } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';

const getMinMax = (arrayPoints) => [ 0, max(arrayPoints) ];
const formatSIPrefix = format(".1s");

 /* https://bl.ocks.org/mbostock/3019563 */
const margin = {top: 20, right: 20, bottom: 20, left: 20};

export const drd_histogram = (opts) => {
  const data = opts.data;

  const xScale = scaleLinear()
     .domain(extent(data)).nice()
     .range([margin.left, opts.width - margin.right]);

  const bins = histogram()
    .domain(xScale.domain())
    .thresholds(xScale.ticks(opts.numBars))(data);

  const yScale = scaleLinear()
    .domain([0, max(bins, d => d.length)]).nice()
    .range([opts.height - margin.bottom, margin.top]);

	const xAxis = g => g
    .attr("transform", `translate(0,${opts.height - margin.bottom})`)
    .call(axisBottom(xScale).tickSizeOuter(0).ticks(4).tickFormat(formatSIPrefix))
    .call(g => g.append("text")
        .attr("x", opts.width - margin.right)
        .attr("y", 30)
        .attr("fill", "#000")
        //.attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(data.x));

	const yAxis = g => g
		.attr("transform", `translate(${margin.left},0)`)
		.call(axisLeft(yScale).ticks(4).tickFormat(formatSIPrefix))
		.call(g => g.select(".domain").remove())
		.call(g => g.select(".tick:last-of-type text").clone()
				.attr("x", 10)
				.attr("y", -15)
				//.attr("text-anchor", "start")
				//.attr("font-weight", "bold")
				.text(data.y))

  const svg = select(opts.elementIDSel)
    .append("svg")
      .attr("width", opts.width + margin.left + margin.right)
      .attr("height", opts.height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const bar = svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => xScale(d.x0) + 1)
      .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
      .attr("y", d => yScale(d.length))
      .attr("height", d => yScale(0) - yScale(d.length));

  svg.append("g")
      .call(xAxis);
  
  svg.append("g")
      .call(yAxis);	
}

