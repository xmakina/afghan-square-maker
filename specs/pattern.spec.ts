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

  describe("with a large blank image", () => {
    const width = 9;
    const height = 10;

    beforeEach(() => {
      subject = Pattern.FromRows(
        Array(height)
          .fill(false)
          .map(() => Array(width).fill(false)),
      );
    });

    describe("when adding a border", () => {
      beforeEach(() => {
        subject = Pattern.AddBorder(subject);
      });

      it("adds a border around the image", () => {
        const patternedOdd = [
          false,
          true,
          false,
          true,
          false, // left edge ends
          true, //1
          false, //2
          true, //3
          false, //4
          true, //5
          false, //6
          true, //7
          false, //8
          true, //9
          false, // right edge begins
          true,
          false,
          true,
          false,
        ];
        const patternedEven = [
          true,
          false,
          true,
          false,
          true, // left edge ends
          false, //1
          true, //2
          false, //3
          true, //4
          false, //5
          true, //6
          false, //7
          true, //8
          false, //9
          true, // right edge begins
          false,
          true,
          false,
          true,
        ];

        // top border
        expect(subject.rows[0]).toEqual(patternedOdd);
        expect(subject.rows[1]).toEqual(patternedEven);
        // end of top border
        expect(subject.rows[5]).toEqual(patternedEven);
        expect(subject.rows[6]).toEqual(patternedOdd);

        // start of image
        expect(subject.rows[8]).toEqual([
          ...[false, true, false, true, false],
          ...Array(width).fill(false),
          ...[false, true, false, true, false],
        ]);
        expect(subject.rows[7]).toEqual([
          ...[true, false, true, false, true],
          ...Array(width).fill(false),
          ...[true, false, true, false, true],
        ]);

        // end of image
        expect(subject.rows[15]).toEqual([
          ...[true, false, true, false, true],
          ...Array(width).fill(false),
          ...[true, false, true, false, true],
        ]);
        expect(subject.rows[16]).toEqual([
          ...[false, true, false, true, false],
          ...Array(width).fill(false),
          ...[false, true, false, true, false],
        ]);

        // bottom border
        expect(subject.rows[17]).toEqual(patternedEven);
        expect(subject.rows[18]).toEqual(patternedOdd);
        // end of bottom border
        expect(subject.rows[22]).toEqual(patternedOdd);
        expect(subject.rows[23]).toEqual(patternedEven);
      });
    });

    describe("when adding padding rows", () => {
      beforeEach(() => {
        subject = Pattern.AddGapRows(subject);
      });

      it("adds gap rows between the pattern rows", () => {
        expect(subject.height).toBe(height * 2);
        expect(subject.width).toBe(width);

        // Check that original rows are preserved at even indices
        for (let i = 0; i < height; i++) {
          expect(subject.rows[i * 2]).toEqual(Array(width).fill(false));
        }

        // Check that gap rows (all false) are added at odd indices
        for (let i = 0; i < height - 1; i++) {
          expect(subject.rows[i * 2 + 1]).toEqual(Array(width).fill(false));
        }
      });
    });
  });
});
