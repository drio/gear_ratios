import { select, selectAll } from 'd3-selection';
import { scaleLinear, scaleLog } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

 /* https://bl.ocks.org/mbostock/3019563 */
const margin = {top: 0, right: 0, bottom: 0, left: 0};

export const genScaleX = (minMax, width) => {
  return scaleLinear()
    .domain(minMax)
    .range([0, width]);
}

export const addAxis = ({ width, height, xScale, xNumTicks, elementIDSel, xLabel}) => {
  const xAxis = axisBottom()
    .scale(xScale)
    .ticks(xNumTicks);

  const svg = select(elementIDSel)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,0)")
    .call(xAxis)
    .append("text")
      .text(xLabel)
      .attr("fill", "black")
      .attr("x", width/2)
      .attr("y", height/2)
}

export const viz = (opts) => {
  const data = opts.data || [],
        xNumTicks = opts.xNumTicks || 20,
        yNumTicks = opts.yNumTicks || 20;

  const width  = opts.width - margin.left - margin.right,
        height = opts.height - margin.top - margin.bottom;

 if (opts.background)
    select(opts.elementIDSel).style("background", opts.background);

  const svg = select(opts.elementIDSel)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg 
    .selectAll("rect")
    .data(data.rollOuts)
    .enter()
      .append("rect")
      .attr('x', (d) => opts.xScale(d))
      .attr('y', 10)
      .attr('fill', (d) => d.fill || 'black')
      .attr('stroke', 'black')
      .attr('height', 10)
      .attr("width", 3);
}
