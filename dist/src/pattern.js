const toMax = (acc, row) => Math.max(acc, row.length);
const isOdd = (val) => {
    if (val === 0) {
        throw new Error("Row number, not ID");
    }
    return val % 2 === 1;
};
const addBorderValue = (rowNumber, stitchNumber) => isOdd(rowNumber) && isOdd(stitchNumber)
    ? false
    : !isOdd(rowNumber) && !isOdd(stitchNumber)
        ? false
        : true;
const arrayMatch = (a, b) => a.length === b.length && a.every((val, idx) => val === b[idx]);
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
        const targetRatio = 3 / 2;
        const currentRatio = subject.width / subject.height;
        const widthDiff = subject.width - subject.height * targetRatio;
        if (currentRatio < targetRatio) {
            // too wide, increase height
        }
        else if (currentRatio > targetRatio) {
            // too tall, increase width
        }
        const topRows = Array(7)
            .fill(false)
            .map((_, rowIdx) => Array(subject.width + 10)
            .fill(false)
            .map((_, stitchIdx) => addBorderValue(rowIdx + 1, stitchIdx + 1)));
        const imageRows = subject.rows.map((val, rowIdx) => [
            ...Array(5)
                .fill(false)
                .map((_, stitchIdx) => addBorderValue(rowIdx + 1 + 7, stitchIdx + 1)),
            ...val,
            ...Array(5)
                .fill(false)
                .map((_, stitchIdx) => addBorderValue(rowIdx + 1 + 7, stitchIdx + 1 + val.length - 1)),
            ,
        ]);
        const bottomRows = Array(7)
            .fill(false)
            .map((_, rowIdx) => Array(subject.width + 10)
            .fill(false)
            .map((_, stitchIdx) => addBorderValue(rowIdx + 1 + (imageRows.length - 1), stitchIdx + 1)));
        return Pattern.FromRows([...topRows, ...imageRows, ...bottomRows]);
    }
    static AddGapRows(subject) {
        const gapRows = subject.rows.flatMap((row, rowIdx) => {
            if (rowIdx > 0 &&
                rowIdx < subject.rows.length - 1 &&
                arrayMatch(row, subject.rows[rowIdx - 1]) &&
                !arrayMatch(row, subject.rows[rowIdx + 1])) {
                return [];
            }
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
