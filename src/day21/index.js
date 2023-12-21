import run from "aocrunner";
import part1 from "./part1.js"
import part2 from "./part2.js"

run({
  part1: {
    tests: [
      {
        input: `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`,
        expected: 16,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
//       {
//         input: `
// ...........
// .....###.#.
// .###.##..#.
// ..#.#...#..
// ....#.#....
// .##..S####.
// .##..#...#.
// .......##..
// .##.#.####.
// .##..##.##.
// ...........`,
//         expected: 6536,
//       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
