import Method from "../src/method";
import Pattern from "../src/pattern";
import { HalfCheckerBoardPattern } from "./halfCheckerBoard";

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
        expect(result[8]).toEqual("Cast off, weave in ends and block");
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
        expect(result[5]).toEqual("Cast off, weave in ends and block");
      });
    });

    // it("correctly groups the instructions", () => {
    //     expect(result[0]).toEqual("Cast on 7");
    //     expect(result[1]).toEqual("Work 4 rows of (K1, P1) to last stitch K1");
    //     expect(result[2]).toEqual("Row 5: K7");
    //     expect(result[3]).toEqual("Row 6: P7");
    //     expect(result[4]).toEqual("Row 7: K7");
    //     expect(result[4]).toEqual("Cast off, weave in ends and block");
    //   });
  });
});
