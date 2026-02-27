import { Instruction } from "./instruction";
import { Pattern } from "./pattern";

type Options = {
  groupRows?: boolean;
};

type InstructionDetails = {
  from: number;
  to: number;
  details: string;
};

export default class Method {
  static FromPattern(pattern: Pattern, options: Options = {}) {
    const instructions = pattern.rows.map((row, idx) =>
      Instruction.FromRow((idx + 1) % 2 === 1, row),
    );
    return Method.Generate(pattern.width, instructions, options);
  }

  private static Generate(
    width: number,
    instructions: string[],
    { groupRows = false }: Options,
  ) {
    const wrapInstructions = instructionWrapper(width);
    const fullInstructions = instructions.map<InstructionDetails>(
      (val, idx) => ({
        from: idx,
        to: idx,
        details: val,
      }),
    );

    if (!groupRows) {
      return wrapInstructions(fullInstructions);
    }

    const groupedInstructions = Method.GroupRows(fullInstructions);
    return wrapInstructions(groupedInstructions);
    // throw Error("Grouping not implemented");
  }

  static GroupRows(fullInstructions: InstructionDetails[]) {
    let groupedInstructions: InstructionDetails[] = [];
    for (let i = 0; i < fullInstructions.length; i++) {
      let count = 1;
      while (
        i + count < fullInstructions.length &&
        fullInstructions[i].details === fullInstructions[i + count].details
      ) {
        count++;
      }

      if (count > 1) {
        groupedInstructions.push({
          from: i,
          to: i + count,
          details: fullInstructions[i].details,
        });
        i += count - 1;
        continue;
      }

      groupedInstructions.push(fullInstructions[i]);
    }

    return groupedInstructions;
  }
}

const instructionWrapper =
  (width: number) => (instructions: InstructionDetails[]) => [
    `Cast on ${width}`,
    ...instructions.map((val) =>
      val.from === val.to
        ? `Row ${val.from + 1}: ${val.details}`
        : `Work ${val.to - val.from} rows of ${val.details}`,
    ),
    "Cast off, weave in ends and block",
  ];
