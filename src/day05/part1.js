import { parseInput } from './shared.js';
import _ from "lodash-es";

export function tracePath(mappings, value) {
  let last = value;
  const path = [
    mappings.seedToSoil,
    mappings.soilToFert,
    mappings.fertToWater,
    mappings.waterToLight,
    mappings.lightToTemp,
    mappings.tempToHumid,
    mappings.humidToLoc
  ].map((mapping) => last = traceStep(mapping, last))

  return path
}

function traceStep(mappings, value) {
  // mapping sample: [52 50 48]
  // destination range start, the source range start, and the range length
  const appliedMapping = _.find(mappings, m => {
    // console.log("is", value, "between", m[1], 'and', m[1] + m[2]);
    return value >= m[1] && value <= m[1] + m[2] - 1;
  })

  // console.log('found mapping', appliedMapping);

  if (appliedMapping) {
    return (value - appliedMapping[1]) + appliedMapping[0]
  }
  return value;
}

const part1 = (rawInput) => {
  const mappings = parseInput(rawInput);

  const mapped = mappings.seeds.map(seed => tracePath(mappings, seed)).map(_.last)

  return _.min(mapped)
};

export default part1;