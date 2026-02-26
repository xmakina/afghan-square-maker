const toMax = (acc: number, row: boolean[]) => Math.max(acc, row.length);

export default class Pattern {
  public readonly rows: boolean[][];

  private constructor(
    public readonly height: number,
    public readonly width: number,
    rows?: boolean[][],
  ) {
    this.rows =
      rows ??
      Array(height)
        .fill(false)
        .map(() => new Array(width).fill(false));
  }

  static FromRows(rows: boolean[][]): Pattern {
    const height = rows.length;
    const width = rows.reduce(toMax, 0);
    return new Pattern(height, width, rows);
  }

  static FromCanvas(canvas: HTMLCanvasElement): Pattern {
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
}

const getPixelValue = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");
  if (context === null) {
    throw Error("No 2D context");
  }

  const data = context.getImageData(0, 0, canvas.width, canvas.height);

  return (x: number, y: number) => {
    const targetPixel = (y * canvas.width + x) * 4;
    return data.data[targetPixel] < 5;
  };
};
