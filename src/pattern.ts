export class Pattern {
  constructor(
    public readonly height: number,
    public readonly width: number,
  ) {
    const rows = Array(height)
      .fill(false)
      .map(() => new Array(width).fill(false));

    this.rows = rows;
  }

  private readonly rows: Array<Array<boolean>>;

  public getAt(x: number, y: number) {
    return this.rows[y][x];
  }

  public setAt(x: number, y: number, value = true) {
    this.rows[x][y] = value;
  }
}
