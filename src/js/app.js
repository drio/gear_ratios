import '../css/style.css';
import {holidaysViz, heatMapHolidaysViz} from './holidays.js';
import {usVsWorldViz} from './usvsworld.js';
import {distributionsViz} from './distributions.js';
import {directorsViz} from './directors.js';
import {genreViz} from './genre.js';
import {csv} from 'd3-fetch';
import {keys} from 'lodash';

import {
  findAttributeValuesFor, isValidMovie, getMoviesByYear
} from './processing.js';
import {HEADER} from './constants.js';

//const DATA_URL = '/src/assets/movies_small.csv';
const DATA_URL = 'src/assets/movies.csv';

const reportStats = (movieRows) => {
  console.log("header attributes: ", movieRows.columns);
  console.log("Number of entries: ", movieRows.length);
  //console.log("Inspecting attribute values:");
  //keys(HEADER).forEach((attrAlias) => findAttributeValuesFor(HEADER[attrAlias], movieRows));
};

window.onload = () => {
  csv(DATA_URL).then((movieRows) => {
    //reportStats(movieRows);
    const {listAllMoviesClean} = getMoviesByYear(movieRows);
    console.log("Number of movies after filtering: ", listAllMoviesClean.length);

    distributionsViz(listAllMoviesClean);
    holidaysViz(listAllMoviesClean);
    heatMapHolidaysViz(listAllMoviesClean);
    usVsWorldViz(listAllMoviesClean);
    directorsViz(listAllMoviesClean);
    //genreViz(listAllMoviesClean);
  });
};
