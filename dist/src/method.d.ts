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
    static FromPattern(pattern: Pattern, options?: Options): string[];
    private static Generate;
    static GroupRows(fullInstructions: InstructionDetails[]): InstructionDetails[];
    static GroupRepeated(fullInstructions: InstructionDetails[]): InstructionDetails[];
}
export {};
//# sourceMappingURL=method.d.ts.map