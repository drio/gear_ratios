import '../css/style.css';
import {csv} from 'd3-fetch';
import {keys, pick, merge} from 'lodash';

const cl = console.log;
const WHEEL_CIRCUM = 2.1;
const ALL_COGS = '11 12 13 14 15 16 17 18 19 21 23 24 25 27 28 30 32 34 36 40 46'
             .split(' ').map((c) => +c);

const BIKES = [
  {
    name: "trek",
    chainRings: [34, 50],
    cogs: [11, 12, 14, 15, 16, 18, 21, 24, 28, 32],
  },
  {
    name: "ritchey",
    chainRings: [42],
    cogs: [11, 13, 15, 17, 19, 18, 25, 28, 32, 36, 42],
  },
  {
    name: "r3",
    chainRings: [36, 52],
    cogs: [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30],
  },
  {
    name: "topstone",
    chainRings: [ 46, 30 ],
    cogs: [ 11, 13, 15, 17, 19, 21, 23, 25, 27, 30, 34, 36 ],
  }
];

const minMaxRollOuts = (bikes) => {
  const minMax = [Infinity, 0];
  bikes.forEach(b => {
    b.rollOuts.forEach(ro => {
      minMax[0] = ro < minMax[0] ? ro : minMax[0];
      minMax[1] = ro > minMax[1] ? ro : minMax[1];
    })
  });
  return minMax;
}

const computeRollOut = ({chainRings, cogs}) => {
  const rollOuts = [];
  chainRings.forEach(ringNumTeeth => {
    cogs.forEach(cTeeths => {
      rollOuts.push(+((ringNumTeeth/cTeeths) * WHEEL_CIRCUM).toFixed(2));
    });
  })
  return rollOuts.sort();
}

const bikesWithRollouts = () => {
  return BIKES.map(b => { 
    return merge(b, {rollOuts: computeRollOut(b)})
  });
}

window.onload = () => {
  console.log(bikesWithRollouts());
  console.log(minMaxRollOuts(BIKES));
};
