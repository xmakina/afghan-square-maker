import Method from "../src/method";
import { Pattern } from "../src/pattern";
import { HalfCheckerBoardPattern, WithGapRows } from "./halfCheckerBoard";

describe("with a method", () => {
  let result: string[];

  describe("with half checker board pattern", () => {
    describe("with no condensing", () => {
      beforeEach(() => {
        result = Method.FromPattern(Pattern.FromRows(HalfCheckerBoardPattern));
      });

      it("correctly groups the instructions", () => {
        expect(result[0]).toEqual("Cast on 7");
        expect(result[1]).toEqual("Row 1: (K1, P1) to last stitch K1");
        expect(result[2]).toEqual("Row 2: (K1, P1) to last stitch K1");
        expect(result[3]).toEqual("Row 3: (K1, P1) to last stitch K1");
        expect(result[4]).toEqual("Row 4: (K1, P1) to last stitch K1");
        expect(result[5]).toEqual("Row 5: K7");
        expect(result[6]).toEqual("Row 6: P7");
        expect(result[7]).toEqual("Row 7: K7");
        expect(result[8]).toEqual("Row 8: (K1, P1) to last stitch K1");
        expect(result[9]).toEqual("Row 9: (K1, P1) to last stitch K1");
        expect(result[10]).toEqual("Row 10: (K1, P1) to last stitch K1");
        expect(result[11]).toEqual("Row 11: (K1, P1) to last stitch K1");
        expect(result[12]).toEqual("Cast off, weave in ends and block");
      });
    });

    describe("with grouped rows", () => {
      beforeEach(() => {
        result = Method.FromPattern(Pattern.FromRows(HalfCheckerBoardPattern), {
          groupRows: true,
        });
      });

      it("correctly groups the instructions", () => {
        expect(result[0]).toEqual("Cast on 7");
        expect(result[1]).toEqual("Work 4 rows of (K1, P1) to last stitch K1");
        expect(result[2]).toEqual("Row 5: K7");
        expect(result[3]).toEqual("Row 6: P7");
        expect(result[4]).toEqual("Row 7: K7");
        expect(result[5]).toEqual(
          "Rows 8-11: Work 4 rows of (K1, P1) to last stitch K1",
        );
        expect(result[6]).toEqual("Cast off, weave in ends and block");
      });
    });

    describe.skip("with group repeated rows", () => {
      beforeEach(() => {
        result = Method.FromPattern(Pattern.FromRows(WithGapRows), {
          groupRows: true,
          groupRepeated:true,
        });
      });

      it("correctly groups the instructions", () => {
        expect(result[0]).toEqual("Cast on 7");
        expect(result[1]).toEqual("Work 4 rows of (K1, P1) to last stitch K1");
        expect(result[2]).toEqual("Row 5 and every odd numbered row: ");
        expect(result[3]).toEqual("Row 6: P7");
        expect(result[4]).toEqual("Row 7: K7");
        expect(result[5]).toEqual(
          "Rows 8-11: Work 4 rows of (K1, P1) to last stitch K1",
        );
        expect(result[6]).toEqual("Cast off, weave in ends and block");
      });
    });
  });
});
