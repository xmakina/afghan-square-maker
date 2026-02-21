import Instruction from "./instruction";
import Pattern from "./pattern";
export default class Method {
    static FromPattern(pattern: Pattern): string[];
    static Generate(width: number, instructions: Instruction[]): string[];
}
