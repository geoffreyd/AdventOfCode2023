import { parseInput } from './shared.js';
import _ from "lodash-es";

export function tracePath(mappings, value) {
  let last = value;
  const path = [
    mappings.humidToLoc,
    mappings.tempToHumid,
    mappings.lightToTemp,
    mappings.waterToLight,
    mappings.fertToWater,
    mappings.soilToFert,
    mappings.seedToSoil
  ].map((mapping) => {
    last = traceStep(mapping, last)
    return last;
  })

  // console.log(path)
  return path[path.length-1];
}

function traceStep(mappings, value) {
  // mapping sample: [52 50 48]
  // destination range start, the source range start, and the range length
  const appliedMapping = _.find(mappings, m => {
    // console.log("is", value, "between", m[1], 'and', m[1] + m[2]);
    return value >= m[0] && value <= m[0] + m[2] - 1;
  })

  // console.log('found mapping', appliedMapping);

  if (appliedMapping) {
    return (value - appliedMapping[0]) + appliedMapping[1]
  }
  return value;
}

function inSeeds(seeds, candidate) {
  return !!_.find(seeds, ([start, len]) => {
    // console.log("Start: " + start + " Len: " + len + " Candidate: " + candidate);
    return candidate >= start && candidate <= start + len - 1;
  });
}

const part2 = (rawInput) => {
  const mappings = parseInput(rawInput);
  const seeds = _.chunk(mappings.seeds, 2)

  console.log("Seeds", seeds.map(([s,l]) => [s, s+l]));

  let candidate = 0;
  let seed = -1;

  do {
    candidate += 1
    seed = tracePath(mappings, candidate)
    if (candidate % 10000 == 0) {
      console.log(candidate, seed);
    }
  } while (!inSeeds(seeds, seed));

  return candidate;
};

export default part2;
