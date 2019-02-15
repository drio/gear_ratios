import { select, selectAll } from 'd3-selection';
import { min, max, extent, histogram } from 'd3-array';

const getMinMax = (arrayPoints) => [ 0, max(arrayPoints) ];

export const drd_heatmap = (opts={}) => {
  const data = opts.data || [];

  const width  = opts.width,
        height = opts.height;

  const ss = opts.side_size; // square_side_size
  const computeRowX = (d, i) => Math.floor( (i*ss) % width);
  const computeRowY = (d, i) => i === 0 ?  0 : ss * (Math.floor( (i*ss) / width) );

  if (opts.background)
    select(opts.elementIDSel).style("background", opts.background);

  const svg = select(opts.elementIDSel)
    .append("svg")
      .attr("width", width)
      .attr("height", height);

  svg 
    .selectAll("rect")
    .data(data)
    .enter()
      .append("rect")
      .attr('width', (d) => ss)
      .attr('height', (d, i) => ss)
      .attr('x', computeRowX)
      .attr('y', computeRowY)
      .attr('rx', opts.corner_radius)
      .attr('ry', opts.corner_radius)
      .attr('fill', opts.fill)
      .attr('stroke', opts.stroke)
      .attr('stroke-width', opts.stroke_width);
}

