import run from "aocrunner";
import part1 from "./part1.js"
import part2 from "./part2.js"

run({
  part1: {
    tests: [
      {
        input: `
      1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
        `,
        expected: "142",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
        `,
        expected: "281",
      },
      {
        input: `
        jlklsix7six
        `,
        expected: "66"
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
