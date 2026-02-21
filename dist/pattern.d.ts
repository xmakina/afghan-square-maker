export default class Pattern {
    readonly height: number;
    readonly width: number;
    constructor(height: number, width: number);
    readonly rows: Array<Array<boolean>>;
    getAt(x: number, y: number): boolean;
    setAt(x: number, y: number, value?: boolean): void;
    toMethod(): string[];
    static FromCanvas(canvas: HTMLCanvasElement): void;
}
