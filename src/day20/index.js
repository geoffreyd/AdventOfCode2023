import run from "aocrunner";
import part1 from "./part1.js"
import part2 from "./part2.js"

run({
  part1: {
    tests: [
//       {
//         input: `broadcaster -> a, b, c
// %a -> b
// %b -> c
// %c -> inv
// &inv -> a`,
//         expected: 32000000,
//       },
      {
        input: `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`,
        expected: 11687500,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> rx`,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
