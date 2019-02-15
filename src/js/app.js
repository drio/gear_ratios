import {csv} from 'd3-fetch';
import {keys, pick, merge} from 'lodash';
import { axisBottom, axisTop } from 'd3-axis';
import { select, selectAll } from 'd3-selection';

import '../css/style.css';
import {viz, addAxis, genScaleX} from './viz';
import { BIKES } from './data';

const cl = console.log;
const WHEEL_CIRCUM = 2.1;

const minMaxRollOuts = (bikes) => {
  const minMax = [Infinity, 0];
  bikes.forEach(b => {
    b.rollOuts.forEach(ro => {
      minMax[0] = ro < minMax[0] ? ro : minMax[0];
      minMax[1] = ro > minMax[1] ? ro : minMax[1];
    })
  });
  return [minMax[0] - 0.5, minMax[1] + 0.5];
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

const addRollOuts = () => {
  return BIKES.map(b => { 
    return merge(b, {rollOuts: computeRollOut(b)})
  });
}

window.onload = () => {
  const width = 800;
  const bikes = addRollOuts(BIKES);
  const minMax = minMaxRollOuts(bikes);
  const xScale = genScaleX(minMax, width);
  const bgColors = ["lightcoral", "lightblue", "peachpuff", "lightyellow"];

  ["#bike-names-container-left", "#bike-names-container-right"].forEach(selName => {
    select(selName)
      .selectAll("div")
      .data(BIKES)
      .enter()
        .append('div')
        .attr('class', 'name')
        .attr('id', (d, i) => 'bike' + i)
        .html((d) => d.name);
  });

  bikes.forEach((b, idx) => {
    viz({
      elementIDSel: "#viz" + idx,
      data: b,
      minMax, 
      width,
      height: 20,
      background: bgColors[idx],
      xLabel: 'fooo',
      xScale,
    });
  });

  addAxis({
    xScale,
    xNumTicks: 20,
    elementIDSel: '#axis-bottom',
    xLabel: '',
    width,
    height: 50,
    axisGen: axisBottom,
    axisType: "bottom",
  });

  addAxis({
    xScale,
    xNumTicks: 20,
    elementIDSel: '#axis-top',
    xLabel: '',
    width,
    height: 50,
    axisGen: axisTop,
    axisType: "top",
  });
};
