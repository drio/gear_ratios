//import {} from 'lodash';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

import {HEADER, GENRES} from './constants.js';
import {dotPlot} from './viz/dotplot.js';

const MOVIES_SEL = '#viz-genre';
const LABEL_SEL = '#viz-genre-label';

const onClickLogic = (d) => {
  console.log(d.movie);
}

export const genreViz = (movies) => {
	const colorScale = scaleLinear().domain([0, GENRES.length-1]).range(['blue', 'red']);

  dotPlot({
    elementIDSel: MOVIES_SEL,
    width: 400,
    height: 400,
    xLabel: 'number votes',
    yLabel: 'rating',
    background: 'floralwhite',
    onClickLogic,
    data: movies.map((m) => {
      const color = 'black';
      return {
        x: +m[HEADER.imdb_votes],
        y: +m[HEADER.imdb_rating],
        fill: colorScale(GENRES.indexOf(m[HEADER.genre])),
        r: 3,
        movie: m,
      };
    })
  });

};

