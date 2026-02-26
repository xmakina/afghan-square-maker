import Method from "../src/method";
import { HalfCheckerBoardInstructions } from "./halfCheckerBoard";

describe("with a method", () => {
  describe("with no instructions", () => {
    it("includes cast on", () => {
      expect(Method.Generate(45, [])[0]).toEqual("Cast on 45");
    });

    it("includes cast off", () => {
      expect(Method.Generate(45, [])[1]).toEqual(
        "Cast off, weave in ends and block",
      );
    });
  });

  describe("with simple instructions", () => {
    it("adds the row number", () => {
      expect(Method.Generate(2, ["some instructions"])[1]).toEqual(
        "Row 1: some instructions",
      );
    });
  });

  describe("with repeating instructions", () => {
    const repeat = "some repeated value";
    let result: string[];
    beforeEach(() => {
      result = Method.Generate(2, [repeat, repeat, repeat]);
    });
    it("condenses the repeated rows", () => {
      expect(result.length).toEqual(3);
    });
    it("explains the repetition", () => {
      expect(result[1]).toEqual("Work 3 rows of some repeated value");
    });
  });

  describe("with alternating repeated instructions", () => {
    const repeat = "some repeated value";
    let result: string[];

    beforeEach(() => {
      result = Method.Generate(2, [
        repeat,
        "123",
        repeat,
        "234",
        repeat,
        "456",
      ]);
    });
    it("condenses the repeated rows", () => {
      expect(result.length).toEqual(6);
    });
    it("explains the repetition", () => {
      expect(result[1]).toEqual(
        "Row 1 and All Odd Numbered Rows: some repeated value",
      );
      expect(result[2]).toEqual("Row 2: 123");
      expect(result[3]).toEqual("Row 4: 234");
      expect(result[4]).toEqual("Row 6: 456");
    });
  });

  describe("with alternating even repeated instructions", () => {
    const repeat = "some repeated value";
    let result: string[];

    beforeEach(() => {
      result = Method.Generate(2, [
        "012",
        repeat,
        "123",
        repeat,
        "234",
        repeat,
      ]);
    });
    it("condenses the repeated rows", () => {
      expect(result.length).toEqual(6);
    });
    it("explains the repetition", () => {
      expect(result[2]).toEqual(
        "Row 2 and All Even Numbered Rows: some repeated value",
      );
      expect(result[1]).toEqual("Row 1: 012");
      expect(result[3]).toEqual("Row 3: 123");
      expect(result[4]).toEqual("Row 5: 234");
    });
  });

  describe("with half checker board instructions", () => {
    let result: string[];
    beforeEach(() => {
      result = Method.Generate(7, HalfCheckerBoardInstructions);
    });

    it("correctly groups the instructions", () => {
      expect(result[0]).toEqual("Cast on 7");
      expect(result[1]).toEqual("Work 4 rows of (K1, P1) to last stitch K1");
      expect(result[2]).toEqual("Row 2 and All Even Numbered Rows: K7");
      expect(result[3]).toEqual("Row 3: P7");
      expect(result[4]).toEqual("Cast off, weave in ends and block");
    });
  });
});
