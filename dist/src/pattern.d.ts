export default class Pattern {
    readonly height: number;
    readonly width: number;
    readonly rows?: boolean[][];
    private constructor();
    static FromRows(rows: boolean[][]): Pattern;
    static FromCanvas(canvas: HTMLCanvasElement): Pattern;
}
//# sourceMappingURL=pattern.d.ts.map