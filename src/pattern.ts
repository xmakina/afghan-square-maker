const toMax = (acc: number, row: boolean[]) => Math.max(acc, row.length);

const isOdd = (val: number) => {
  if (val === 0) {
    throw new Error("Row number, not ID");
  }

  return val % 2 === 1;
};

const addBorderValue = (rowNumber: number, stitchNumber: number) =>
  isOdd(rowNumber) && isOdd(stitchNumber)
    ? false
    : !isOdd(rowNumber) && !isOdd(stitchNumber)
      ? false
      : true;

const arrayMatch = <T>(a: T[], b: T[]) =>
  a.length === b.length && a.every((val, idx) => val === b[idx]);

export class Pattern {
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

  static AddBorder(subject: Pattern): Pattern {
    const topRows = Array(7)
      .fill(false)
      .map((_, rowIdx) =>
        Array(subject.width + 10)
          .fill(false)
          .map((_, stitchIdx) => addBorderValue(rowIdx + 1, stitchIdx + 1)),
      );

    const imageRows = subject.rows.map((val, rowIdx) => [
      ...Array(5)
        .fill(false)
        .map((_, stitchIdx) => addBorderValue(rowIdx + 1 + 7, stitchIdx + 1)),
      ...val,
      ...Array(5)
        .fill(false)
        .map((_, stitchIdx) =>
          addBorderValue(rowIdx + 1 + 7, stitchIdx + 1 + val.length - 1),
        ),
      ,
    ]);
    const bottomRows = Array(7)
      .fill(false)
      .map((_, rowIdx) =>
        Array(subject.width + 10)
          .fill(false)
          .map((_, stitchIdx) =>
            addBorderValue(rowIdx + 1 + (imageRows.length - 1), stitchIdx + 1),
          ),
      );

    return Pattern.FromRows([...topRows, ...imageRows, ...bottomRows]);
  }

  static AddGapRows(subject: Pattern): Pattern {
    const gapRows = subject.rows.flatMap((row) => {
      return [row, new Array(subject.width).fill(false)];
    });

    return Pattern.FromRows(gapRows);
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
    return data.data[targetPixel] < 64;
  };
};
