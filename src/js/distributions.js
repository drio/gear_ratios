import {HEADER, numericalAttributes } from './constants.js';
import {drd_histogram} from './viz/histogram.js';
import {range} from 'lodash';
import { select } from 'd3-selection';

const addContainers = (elemIDSel) => {
	select(elemIDSel)
		.selectAll("div")
		.data(numericalAttributes)
		.enter()
			.append("div")
			.attr("class", "histogram-small")
			.attr("id", (d) => "histogram-small-" + d );
}

export const distributionsViz = (movies) => {
	addContainers("#viz-histogram-container");

  let attributeToValues = {};
  movies.forEach((movie) => {
    numericalAttributes.forEach((attr) => {
      if (!attributeToValues[attr]) attributeToValues[attr] = [];
      attributeToValues[attr].push(+movie[HEADER[attr]])
    });
  });
 
  numericalAttributes.forEach((attr) => {
    let data = attributeToValues[attr];
    data.x = attr + ' value'
    data.y = 'frequency';
    drd_histogram({
      width: 250,
      height: 150,
      numBars: 15,
      elementIDSel: `#histogram-small-${attr}`,
      data,
    });
  });
};

