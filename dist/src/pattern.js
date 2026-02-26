const toMax = (acc, row) => Math.max(acc, row.length);
const isOdd = (val) => (val + 1) % 2 === 1;
const addBorderValue = (row, stitch) => isOdd(row) && isOdd(stitch)
    ? false
    : !isOdd(row) && !isOdd(stitch)
        ? false
        : true;
export class Pattern {
    height;
    width;
    rows;
    constructor(height, width, rows) {
        this.height = height;
        this.width = width;
        this.rows =
            rows ??
                Array(height)
                    .fill(false)
                    .map(() => new Array(width).fill(false));
    }
    static FromRows(rows) {
        const height = rows.length;
        const width = rows.reduce(toMax, 0);
        return new Pattern(height, width, rows);
    }
    static FromCanvas(canvas) {
        const context = canvas.getContext("2d");
        if (context === null) {
            throw Error("No 2D context");
        }
        const pixelAt = getPixelValue(canvas);
        const { height, width } = canvas;
        const pattern = new Pattern(height, width);
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                pattern.rows[y][x] = pixelAt(x, y);
            }
        }
        return pattern;
    }
    static AddBorder(subject) {
        const topRows = Array(7)
            .fill(false)
            .map((_, row) => Array(subject.width + 10)
            .fill(false)
            .map((_, stitch) => addBorderValue(row, stitch)));
        const imageRows = subject.rows.map((val, row) => [
            ...Array(5)
                .fill(false)
                .map((_, stitch) => addBorderValue(row + 7, stitch)),
            ...val,
            ...Array(5)
                .fill(false)
                .map((_, stitch) => addBorderValue(row + 7, stitch)),
            ,
        ]);
        return Pattern.FromRows([...topRows, ...imageRows, ...topRows]);
    }
    static AddGapRows(subject) {
        const gapRows = subject.rows.flatMap((row) => {
            return [row, new Array(subject.width).fill(false)];
        });
        return Pattern.FromRows(gapRows);
    }
}
const getPixelValue = (canvas) => {
    const context = canvas.getContext("2d");
    if (context === null) {
        throw Error("No 2D context");
    }
    const data = context.getImageData(0, 0, canvas.width, canvas.height);
    return (x, y) => {
        const targetPixel = (y * canvas.width + x) * 4;
        return data.data[targetPixel] < 5;
    };
};
const interleave = (arr) => Array.from({
    length: arr.length,
}, (_, i) => arr.map((r) => r[i] ?? null)).flat();
