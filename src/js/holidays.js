import {HEADER, MONTHS, combinedRatings, combinedGross, YEAR_RANGE} from './constants.js';
import {dotPlot} from './viz/dotplot.js';
import {drd_heatmap} from './viz/heatmap.js';
import {select, selectAll, event as d3event} from 'd3-selection';
import {range} from 'lodash';
import {interpolateOrRd, interpolateGnBu} from 'd3-scale-chromatic';

const yearIDS = [ "#year-start", "#year-end" ];

const state = {
  allMovies: [],
  yearStart: YEAR_RANGE[0],
  yearEnd: YEAR_RANGE[1],
};

const flattenForHeatMap = (moviesByYear) => {
  const years = _.keys(moviesByYear);
  const flat_months = [];

  _.keys(moviesByYear).forEach((year) => {
    _.forEach(_.range(0, 12), (month) => {
      const listRatings = moviesByYear[year][month];
      flat_months.push({
        year,
        month,
        mean: listRatings.length === 0 ? null : _.mean(listRatings)
      })
    })
  });

  return flat_months;
};

const parseDate = (dateString) => {
  /* We know it is going to be parse-able */
  const month = new Date(dateString).getMonth();
  const year = new Date(dateString).getFullYear();
  return [month, year];
};

const addMonthAndYear = (movies) => {
  return _.chain(movies)
    .map((m) => {
      return _.pick(m, [HEADER.release, HEADER.imdb_rating, HEADER.rt_rating]);
    })
    .map((m) => {
		  const [month, year] = parseDate(m[HEADER.release]);
      return _.merge(m, { month, year });
    })
    .sortBy(['year', 'month'])
    .value();
}

const getMoviesByMonth = (movies) => {
  const store = {};

  addMonthAndYear(movies).forEach((movie) => {
    const {year, month} = movie;
    if (!store.hasOwnProperty(year)) { 
      store[year] = {monthsWithMovies: 0};
      _.forEach(_.range(0, 12), (month) => store[year][month] = []);
    }
    if (store[year][month].length === 0) store[year].monthsWithMovies += 1;
    store[year][month].push(combinedRatings(movie));
  });

  /*
  const yearsToMovies = {};
  _.keys(store).forEach((year) => {
    if (store[year].monthsWithMovies === 12)
      yearsToMovies[year] = store[year];
  });
  */

  return store;
}

const updateCurrentYears = () => {
  const years =  yearIDS.map((selID) => {
    const node = select(selID).node();
    return +node.options[node.selectedIndex].value;
  });
  state.yearStart = years[0];
  state.yearEnd = years[1];
}

const processMovies = () => {
	const monthToMovies = {};
  updateCurrentYears();
	state.allMovies.forEach((movie) => {
    const [month, year] = parseDate(movie[HEADER.release]);
		if (month < 0 || month > 11 || isNaN(month)) {
			console.warn("holidays.js processMovies(): found an invalid month.");
		}
		else {
      if (year >= state.yearStart && year <= state.yearEnd) {
        if (!monthToMovies.hasOwnProperty(month)) 
          monthToMovies[month] = [];
        monthToMovies[month].push(movie);
      }
		}
	});
	return monthToMovies;
};

const addContainers = (elemIDSel, monthToMovies) => {
	select(elemIDSel)
		.selectAll("div")
		.data(_.keys(monthToMovies))
		.enter()
			.append("div")
			.attr("class", "dotplot-small")
			.attr("id", (d) => "dotplot-small-month" + d );
}


const prepareSelects = () => {
  const addYears = (sel, yearRange) => {
    sel
      .selectAll('option')
      .data(yearRange)
      .enter()
        .append('option')
        .attr('value', (d) => d)
        .html((d) => d);
    sel.on('change', renderViz);
  }

  const selStart = select("#year-start");
  const selEnd   = select("#year-end");
  addYears(selStart, range(YEAR_RANGE[0], YEAR_RANGE[1] + 1))
  addYears(selEnd, range(YEAR_RANGE[1], YEAR_RANGE[0] + 1))
}

const renderViz = () => {
	const monthToMovies = processMovies();
  selectAll('#viz-dotplot-container').selectAll('div').remove();
	addContainers("#viz-dotplot-container", monthToMovies);
	_.range(12).forEach((month) => {
		dotPlot({
      title: MONTHS[month],
			elementIDSel: '#dotplot-small-month' + month,
			width: 200,
			height: 200,
			xLabel: 'revenue',
			yLabel: 'ratings',
      xNumTicks: 3,
      yNumTicks: 3,
			background: ((month>4 && month<8) || (month === 11)) ? "lightpink" : "LightCyan",
			data: (monthToMovies[month] || []).map((m) => {
				const color = (m[HEADER.title] === 'Back to the Future') ?
					            'orangeRed' : 'black';	
				return { x: combinedGross(m), y: combinedRatings(m), fill: color, r: 3, movie: m };
			})
		});
	});
}

export const holidaysViz = (movies) => {
  state.allMovies = movies;
  prepareSelects();
  renderViz();
};

export const heatMapHolidaysViz = (movies) => {
  const moviesByMonth = flattenForHeatMap(getMoviesByMonth(movies));	
  drd_heatmap({
    elementIDSel: '#viz-heatmap-container',
    width: 12 * 20,
    height: 20 * (moviesByMonth.length/12),
    side_size: 20,
    pad: 2,
    corner_radius: 0,
    fill: (d, i) => d.mean ? interpolateOrRd(d.mean/100) : 'white',
    stroke: 'black',
    stroke_width: 0,
    background: 'white',
    data: moviesByMonth,
  });

  drd_heatmap({
    elementIDSel: '#viz-heatmap-container-2',
    width: 12 * 20,
    height: 20 * (moviesByMonth.length/12),
    side_size: 20,
    pad: 2,
    corner_radius: 0,
    fill: (d, i) => d.mean ? interpolateGnBu(d.mean/100) : 'white',
    stroke: 'white',
    stroke_width: 0,
    background: 'white',
    data: moviesByMonth,
  });

};

