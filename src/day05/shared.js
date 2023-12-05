import _ from "lodash-es";

function extractBlock(input) {
  input.shift() // blank line
  input.shift() // seed-to-soil map:
  const ret = [];
  while (input[0] && input[0] !== '') {
    const nums = input.shift().split(' ').map(_.parseInt)
    // console.log(nums);
    ret.push(nums);
  }
  // console.log(ret)
  return ret;
}

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n");

  const seeds = _.compact(input.shift().split(':')[1].split(" ")).map(_.parseInt);

  const seedToSoil = extractBlock(input);
  const soilToFert = extractBlock(input);
  const fertToWater = extractBlock(input);
  const waterToLight = extractBlock(input);
  const lightToTemp = extractBlock(input);
  const tempToHumid = extractBlock(input);
  const humidToLoc = extractBlock(input);

  return {
    seeds,
    seedToSoil,
    soilToFert,
    fertToWater,
    waterToLight,
    lightToTemp,
    tempToHumid,
    humidToLoc
  };
};
