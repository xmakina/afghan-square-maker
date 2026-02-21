"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("./instruction");
class Method {
    static FromPattern(pattern) {
        const instructions = pattern.rows.map((row, idx) => instruction_1.default.FromRow(idx + 1 % 2 === 1, row));
        return Method.Generate(pattern.width, instructions);
    }
    static Generate(width, instructions) {
        const condensedInstructions = [];
        for (let i = 0; i < instructions.length;) {
            let count = 1;
            while (instructions[i] === instructions[i + count] &&
                i < instructions.length) {
                count++;
            }
            condensedInstructions.push(count > 1
                ? `Work ${count} rows of ${instructions[i]}`
                : `${instructions[i]}`);
            i += count;
        }
        const alternatingInstructions = [];
        for (let i = 0; i < condensedInstructions.length; i++) {
            if (condensedInstructions[i].startsWith("Work ")) {
                alternatingInstructions.push(condensedInstructions[i]);
                continue;
            }
            const alternates = condensedInstructions
                .slice(i)
                .reduce((repeats, val, idx) => {
                if (!repeats || idx % 2 === 1) {
                    // + not same odd/even, skip
                    return repeats;
                }
                if (val === condensedInstructions[i + 2]) {
                    return true;
                }
                return false;
            }, true);
            if (alternates === false) {
                alternatingInstructions.push(`Row ${i + 1}: ${condensedInstructions[i]}`);
                continue;
            }
            if ((i + 1) % 2 === 0) {
                alternatingInstructions.push(`Row ${i + 1} and All Even Numbered Rows: ${condensedInstructions[i]}`);
                const remainder = condensedInstructions.slice(i + 1).map((val, idx) => `Row ${i + idx + 2}: ${val}`).filter((_, idx) => idx % 2 === 0);
                alternatingInstructions.push(...remainder);
                break;
            }
            alternatingInstructions.push(`Row ${i + 1} and All Odd Numbered Rows: ${condensedInstructions[i]}`);
            const remainder = condensedInstructions.slice(i + 1).map((val, idx) => `Row ${i + idx + 2}: ${val}`).filter((_, idx) => idx % 2 === 0);
            alternatingInstructions.push(...remainder);
            break;
        }
        return [
            `Cast on ${width}`,
            ...alternatingInstructions,
            "Cast off, weave in ends and block",
        ];
    }
}
exports.default = Method;
