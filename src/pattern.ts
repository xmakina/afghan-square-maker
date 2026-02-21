import Method from "./method";

export default class Pattern {
  constructor(
    public readonly height: number,
    public readonly width: number,
  ) {
    this.rows = Array(height)
      .fill(false)
      .map(() => new Array(width).fill(false));;
  }

  public readonly rows: Array<Array<boolean>>

  public getAt(x: number, y: number) {
    return this.rows[y][x];
  }

  public setAt(x: number, y: number, value = true) {
    this.rows[x][y] = value;
  }

  public toMethod() {
    return Method.FromPattern(this)
  }

  static FromCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d")
    if (context === null) {
      throw Error("No 2D context")
    }

    const pixelAt = getPixelValue(canvas);
    const { height, width } = canvas
    const pattern = new Pattern(height, width)
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        pattern.setAt(x, y, pixelAt(x, y))
      }
    }
  }
}


const getPixelValue = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d")
  if (context === null) {
    throw Error("No 2D context")
  }

  const data = context.getImageData(0, 0, canvas.width, canvas.height)

  return (x: number, y: number) => {
    const targetPixel = (y * canvas.width + x) * 4
    return data.data[targetPixel] < 5
  }
}