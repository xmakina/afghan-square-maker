import { Pattern } from "../src/pattern";

describe("with a pattern", () => {
  let subject: Pattern;

  describe("when initialised", () => {
    beforeEach(() => {
      subject = Pattern.FromRows([
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
    });

    it("is all false", () => {
      expect(subject.rows[0][0]).toBeTruthy();
      expect(subject.rows[1][1]).toBeTruthy();
      expect(subject.rows[2][2]).toBeTruthy();

      expect(subject.rows[0][1]).toBeFalsy();
      expect(subject.rows[1][2]).toBeFalsy();
      expect(subject.rows[2][0]).toBeFalsy();
    });
  });

  describe("when adding a border", () => {
    const width = 8;
    const height = 10;

    beforeEach(() => {
      subject = Pattern.FromRows(
        Array(height)
          .fill(false)
          .map(() => Array(width).fill(false)),
      );

      subject = Pattern.AddBorder(subject);
    });

    it("it has the top of the pattern", () => {
      const patterned = [
        false,
        true,
        false,
        true,
        false, // left edge
        true, //1
        false, //2
        true, //3
        false, //4
        true, //5
        false, //6
        true, //7
        false, //8
        true, // right edge
        false,
        true,
        false,
        true,
      ];

      // top border
      expect(subject.rows[0]).toEqual(patterned);
      // end of top border
      expect(subject.rows[6]).toEqual(patterned);

      // start of image
      expect(subject.rows[7]).toEqual([
        ...[false, true, false, true, false],
        ...Array(width).fill(false),
        ...[true, false, true, false, true],
      ]);

      // end of image
      expect(subject.rows[16]).toEqual([
        ...[false, true, false, true, false],
        ...Array(width).fill(false),
        ...[true, false, true, false, true],
      ]);

      // top border
      expect(subject.rows[17]).toEqual(patterned);
      // end of top border
      expect(subject.rows[23]).toEqual(patterned);
    });
  });
});
