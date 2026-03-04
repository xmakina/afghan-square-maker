import { Instruction } from "./instruction";
import { Pattern } from "./pattern";

type Options = {
  groupRows?: boolean;
  groupRepeated?: boolean;
};

type InstructionDetails = {
  from: number;
  to: number;
  details: string;
};

export default class Method {
  static FromPattern(pattern: Pattern, options: Options = {}) {
    const instructions = pattern.rows.map((row, idx) =>
      Instruction.FromRow(idx % 2 === 1, row),
    );
    return Method.Generate(pattern.width, instructions, options);
  }

  private static Generate(
    width: number,
    instructions: string[],
    { groupRows = false, groupRepeated = false }: Options,
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
    if (!groupRepeated) {
      return wrapInstructions(groupedInstructions);
    }

    const groupedRepeatedInstructions =
      Method.GroupRepeated(groupedInstructions);
    return wrapInstructions(groupedRepeatedInstructions);
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

  static GroupRepeated(fullInstructions: InstructionDetails[]) {
    for (let i = 0; i < fullInstructions.length; i++) {
      if (fullInstructions[i].details === fullInstructions[i + 2].details) {
        const keepsRepeating = fullInstructions
          .slice(i + 2)
          .reduce((acc, val, idx, list) => {
            return (acc && idx % 2 === 1) || val.details === list[0].details;
          }, true);
        if (keepsRepeating) {
          const start = fullInstructions.slice(0, i - 1);
          const repeatedInstruction: InstructionDetails = {
            from: i,
            to: fullInstructions.length - 1,
            details: "And all odd",
          };
          const remaining = fullInstructions
            .slice(i)
            .filter((_, idx) => idx % 2 === 1);
          return [...start, repeatedInstruction, ...remaining];
        } else {
          return fullInstructions;
        }
      }
    }
  }
}

const instructionWrapper =
  (width: number) => (instructions: InstructionDetails[]) => [
    `Cast on ${width}`,
    ...instructions.map((val, idx) =>
      val.from === val.to
        ? `Row ${val.from + 1}: ${val.details}`
        : `${idx > 0 ? `Rows ${val.from + 1}-${val.to}: ` : ""}Work ${val.to - val.from} rows of ${val.details}`,
    ),
    "Cast off, weave in ends and block",
  ];
