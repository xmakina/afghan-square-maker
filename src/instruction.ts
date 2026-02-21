export default class Instruction {
  static FromRow(isOdd: boolean, row: boolean[]) {
    const groupings = [];
    for (let i = 0; i < row.length;) {
      let count = 1;
      while (row[i] === row[i + count] && i < row.length) {
        count++;
      }
      i = i + count;
      groupings.push(count);
    }

    const instructions = isOdd
      ? getInstructionKnitFill(row[0], groupings)
      : getInstructionPerlFill(row[0], groupings);

    const isRepeated = instructions.reduce(
      (repeats, val, idx, instructions) => {
        if (!repeats) {
          return repeats;
        }

        if (idx >= instructions.length - 2) {
          return repeats;
        }

        if (val === instructions[idx + 2]) {
          return true;
        }

        return false;
      },
      true,
    );

    if (isRepeated && instructions.length > 2) {
      return `(${instructions[0]}, ${instructions[1]}) to last stitch ${instructions[instructions.length - 1]}`;
    }

    return instructions.join(" ");
  }
}

const getInstructionKnitFill = (initial: boolean, groupings: number[]) => {
  if (initial) {
    return groupings.map(KnitFirst);
  }

  return groupings.map(PerlFirst);
};

const getInstructionPerlFill = (initial: boolean, groupings: number[]) => {
  if (initial) {
    return groupings.map(PerlFirst);
  }

  return groupings.map(KnitFirst);
};

const KnitFirst = (v: number, idx: number) =>
  idx % 2 === 0 ? `K${v}` : `P${v}`;

const PerlFirst = (v: number, idx: number) =>
  idx % 2 === 0 ? `P${v}` : `K${v}`;
