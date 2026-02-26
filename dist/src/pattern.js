const toMax = (acc, row) => Math.max(acc, row.length);
export default class Pattern {
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
        const topRows = Array(subject.width)
            .fill(false)
            .map(() => Array(subject.width).fill(false).map((_, idx) => idx % 2 === 1));
        return Pattern.FromRows([...topRows, ...subject.rows]);
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
