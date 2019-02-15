import { select, selectAll } from 'd3-selection';
import { scaleLinear, scaleLog } from 'd3-scale';

export const genScaleX = (minMax, width) => {
  return scaleLinear()
    .domain(minMax)
    .range([0, width]);
}

export const addAxis = (opts) => {
  const { width, height, xScale, xNumTicks, 
          elementIDSel, xLabel, axisGen, axisType } = opts;

  const xAxis = axisGen()
    .scale(xScale)
    .ticks(xNumTicks);

  const svg = select(elementIDSel)
    .append("svg")
      .attr("width", width)
      .attr("height", height)

  const container = axisType === 'top'
    ? svg.append("g").attr("transform", "translate(0," + (height - 1)  + " )")
    : svg;

  const axis = container
    .call(xAxis)
    .append("text")
      .text(xLabel)
      .attr("fill", "black");

  if (axisType === 'top') {
    axis
      .attr("x", width/2)
      .attr("y", - height/2)
  } else {
    axis
      .attr("x", width/2)
      .attr("y", height/2)
  }
}

export const viz = (opts) => {
  const data = opts.data || [],
        xNumTicks = opts.xNumTicks || 20,
        yNumTicks = opts.yNumTicks || 20;

  const barHeight = 10, barWidth = 1;

  if (opts.background)
    select(opts.elementIDSel).style("background", opts.background);

  const svg = select(opts.elementIDSel)
    .append("svg")
      .attr("width", opts.width)
      .attr("height", opts.height)
      .attr("style", "background: " + opts.background || "white");

  svg 
    .selectAll("rect")
    .data(data.rollOuts)
    .enter()
      .append("rect")
      .attr('x', (d) => opts.xScale(d))
      .attr('y', opts.height/2 - (barHeight/2) + 5)
      .attr('fill', (d) => d.fill || 'black')
      .attr('stroke', 'black')
      .attr('height', barHeight)
      .attr("width", barWidth);
}
