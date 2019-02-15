import '../css/style.css';
import {csv} from 'd3-fetch';
import {keys} from 'lodash';

const DATA_URL = '/src/assets/movies_small.csv';

window.onload = () => {
  csv(DATA_URL).then((movieRows) => {
    console.log("Data: ", movieRows);
  });
};
