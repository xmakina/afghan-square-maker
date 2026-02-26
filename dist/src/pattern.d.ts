export declare class Pattern {
    readonly height: number;
    readonly width: number;
    readonly rows: boolean[][];
    private constructor();
    static FromRows(rows: boolean[][]): Pattern;
    static FromCanvas(canvas: HTMLCanvasElement): Pattern;
    static AddBorder(subject: Pattern): Pattern;
}
//# sourceMappingURL=pattern.d.ts.map