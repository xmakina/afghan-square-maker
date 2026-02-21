"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const method_1 = require("./method");
class Pattern {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.rows = Array(height)
            .fill(false)
            .map(() => new Array(width).fill(false));
        ;
    }
    getAt(x, y) {
        return this.rows[y][x];
    }
    setAt(x, y, value = true) {
        this.rows[x][y] = value;
    }
    toMethod() {
        return method_1.default.FromPattern(this);
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
                pattern.setAt(x, y, pixelAt(x, y));
            }
        }
    }
}
exports.default = Pattern;
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
