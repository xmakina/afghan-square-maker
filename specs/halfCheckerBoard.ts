export const HalfCheckerBoardPattern = [
  [false, true, false, true, false, true, false],
  [true, false, true, false, true, false, true],
  [false, true, false, true, false, true, false],
  [true, false, true, false, true, false, true],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [true, false, true, false, true, false, true],
  [false, true, false, true, false, true, false],
  [true, false, true, false, true, false, true],
  [false, true, false, true, false, true, false],
];

export const HalfCheckerBoardInstructions = [
  "(K1, P1) to last stitch K1",
  "(K1, P1) to last stitch K1",
  "(K1, P1) to last stitch K1",
  "(K1, P1) to last stitch K1",
  "K7",
  "P7",
  "K7",
];

export const WithGapRows = [
  [false, true, false, true, false, true, false],
  [true, false, true, false, true, false, true],
  [false, true, false, true, false, true, false],
  [true, false, true, false, true, false, true],
  [true, false, false, false, false, false, true], // gap row starts
  Array(7).fill((Math.random() * 10) % 2 === 0),
  [true, false, false, false, false, false, true],
  Array(7).fill((Math.random() * 10) % 2 === 0),
  [true, false, false, false, false, false, true],
  Array(7).fill((Math.random() * 10) % 2 === 0),
  [true, false, false, false, false, false, true],
  Array(7).fill((Math.random() * 10) % 2 === 0),
  [true, false, false, false, false, false, true],
  Array(7).fill((Math.random() * 10) % 2 === 0),
  [true, false, false, false, false, false, true], // gap row ends
  [false, true, false, true, false, true, false],
  [true, false, true, false, true, false, true],
  [false, true, false, true, false, true, false],
  [true, false, true, false, true, false, true],
];
