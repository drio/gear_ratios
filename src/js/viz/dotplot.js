import { select, selectAll } from 'd3-selection';
import { scaleLinear, scaleLog } from 'd3-scale';
import { min, max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';

const getMinMax = (arrayPoints) => [ 0, max(arrayPoints) ];

 /* https://bl.ocks.org/mbostock/3019563 */
const margin = {top: 40, right: 40, bottom: 40, left: 40};

export const dotPlot = (opts) => {
  const data = opts.data || [],
        default_fill = 'black',
        default_r = 2,
        xNumTicks = opts.xNumTicks || 4,
        yNumTicks = opts.yNumTicks || 4;

  const formatSIPrefix = format(".2s");

  const width  = opts.width - margin.left - margin.right,
        height = opts.height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(getMinMax(data.map((point) => point.x)))
    .range([0, width]);
  
  window.x = xScale;

  const yScale = scaleLinear()
    .domain(getMinMax(data.map((point) => point.y))).nice()
    .range([height, 0]);

 if (opts.background)
    select(opts.elementIDSel).style("background", opts.background);

  const svg = select(opts.elementIDSel)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   svg
    .append("text")
    .text(opts.title)
    .attr("font-size", "8px")
    .attr("fill", "black")
    .attr("x", width/3)
    .attr("y", 0)

  svg 
    .selectAll("circle")
    .data(data)
    .enter()
      .append("circle")
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('fill', (d) => d.fill || default_fill)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr("r", (d) => d.r || default_r)
        .on("click", opts.onClickLogic)
        .on("mouseover", opts.onMouseOverLogic)
        .on("mouseout", opts.onMouseOutLogic);

  /* Axis */ 
  const xAxis = axisBottom()
    .scale(xScale)
    .ticks(xNumTicks)
    .tickFormat(formatSIPrefix);

  const yAxis = axisLeft()
    .scale(yScale)
    .ticks(yNumTicks)
    .tickFormat(formatSIPrefix);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis)
    .append("text")
      .text(opts.xLabel)
      .attr("fill", "black")
      .attr("x", width - 20)
      .attr("y", -5)

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + 0 + ",0)")
    .call(yAxis)
    .append("text")
      .text(opts.yLabel)
      .attr("fill", "black")
      .attr("x", -5)
      .attr("y", 10);

/*
svg.selectAll("text")
     .data(data)
     .enter()
     .append("text")
         .text((d) => f(d.x) + "," + d.y)
         .attr('x', (d) => xScale(d.x))
         .attr('y', (d) => yScale(d.y))
         .attr("font-family", "sans-serif")
         .attr("font-size", "10px")
         .attr("fill", "red");
*/
}
