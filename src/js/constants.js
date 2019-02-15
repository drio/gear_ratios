import { format } from 'd3-format';

export const HEADER = {
  title:       'Title',

  release:     'Release Date',
  mpaa:        'MPAA Rating',
  distributor: 'Distributor',
  source:      'Source',
  genre:       'Major Genre',
  type:        'Creative Type', 
  director:    'Director', 

  rt_rating:   'Rotten Tomatoes Rating', 
  imdb_rating: 'IMDB Rating', 
  imdb_votes:  'IMDB Votes',
  run_time:    'Running Time (min)',
  budget:      'Production Budget',
  us_gross:    'US Gross',
  world_gross: 'Worldwide Gross',
  dvd_sales:   'US DVD Sales',
};

export const GENRES = [
  'Contemporary Fiction', 
  'Historical Fiction',
  'Fantasy',
  'Science Fiction',
  'Dramatization',
  'Kids Fiction',
  'Super Hero',
  'Factual',
  'Comedy',
  'Drama',
  'Romantic Comedy',
  'Adventure',
  'Documentary',
  'Musical',
  'Black Comedy',
  'Action',
  'Original Screenplay',
  'Multiple Creative Types',
  'Horror',
  'Creative Type',
  'Based on Book/Short Story', 
];

export const MONTHS = {
  0: "January", 1 : "February", 2 : "March", 3 : "April",
  4 : "May", 5 : "June", 6 : "July", 7 : "August",
  8 : "September", 9 : "October", 10 : "November", 11 : "December",
};

export const YEAR_RANGE = [ 1960, 2010 ];

export const numericalAttributes = [
  'rt_rating', 'imdb_rating', 'imdb_votes', 'run_time', 
  'budget', 'us_gross', 'world_gross'
];

export const combinedGross = (movie) => {
  return (+movie[HEADER.us_gross]) + (+movie[HEADER.world_gross]);
};

export const combinedRatings = (movie) => {
  const imdb = +movie[HEADER.imdb_rating] ? (+movie[HEADER.imdb_rating]*10) : 0;
  const rt   = +movie[HEADER.rt_rating] ? (+movie[HEADER.rt_rating]) : 0;

  let combinedRating;
  if (imdb && rt) {
    combinedRating = (rt + imdb)/2;
  }
  else if (imdb && !rt) {
    combinedRating = imdb;
  }
  else if (!imdb && rt) {
    combinedRating = rt;
  }
  else {
    combinedRating = 0;
  }
  
  return combinedRating;
}; 
