import Instruction from "../src/instruction";
import { HalfCheckerBoardPattern } from "./halfCheckerBoard";

describe("when given a single blank", () => {
  const row = [false];
  describe("when on an odd row", () => {
    // perl is blank on even row
    const isOdd = true;
    it("calls for a perl", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("P1");
    });
  });
  describe("when on an even row", () => {
    // knit is blank on even row
    const isOdd = false;
    it("calls for a knit", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("K1");
    });
  });
});

describe("when given a single fill", () => {
  const row = [true];
  describe("when on an odd row", () => {
    const isOdd = true;
    it("calls for a knit", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("K1");
    });
  });
  describe("when on an even row", () => {
    const isOdd = false;
    it("calls for a perl", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("P1");
    });
  });
});

describe("when given a double fill", () => {
  const row = [true, true];
  describe("when on an odd row", () => {
    const isOdd = true;
    it("calls for a knit", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("K2");
    });
  });
  describe("when on an even row", () => {
    const isOdd = false;
    it("calls for a perl", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("P2");
    });
  });
});

describe("when given a double blank", () => {
  const row = [false, false];
  describe("when on an odd row", () => {
    const isOdd = true;
    it("calls for a knit", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("P2");
    });
  });
  describe("when on an even row", () => {
    const isOdd = false;
    it("calls for a perl", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("K2");
    });
  });
});

describe("when given an alternating pattern", () => {
  const row = [true, false];
  describe("when on an odd row", () => {
    const isOdd = true;
    it("calls for a knit", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("K1 P1");
    });
  });
  describe("when on an even row", () => {
    const isOdd = false;
    it("calls for a perl", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual("P1 K1");
    });
  });
});

describe("when given a complex pattern", () => {
  const row = [
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    false,
    true,
  ];
  describe("when on an odd row", () => {
    const isOdd = true;
    it("calls for a knit", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual(
        "K1 P1 K1 P1 K4 P2 K1 P1 K1",
      );
    });
  });
  describe("when on an even row", () => {
    const isOdd = false;
    it("calls for a perl", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual(
        "P1 K1 P1 K1 P4 K2 P1 K1 P1",
      );
    });
  });
});

describe("when given a repeating pattern", () => {
  const row = [true, false, true, false, true, false, true, false, true];
  describe("when on an odd row", () => {
    const isOdd = true;
    it("groups K1, P1 together", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual(
        "(K1, P1) to last stitch K1",
      );
    });
  });
  describe("when on an even row", () => {
    const isOdd = false;
    it("groups P1, K1 together", () => {
      expect(Instruction.FromRow(isOdd, row)).toEqual(
        "(P1, K1) to last stitch P1",
      );
    });
  });

  describe("with a half checkerboard", () => {
    let result: string[];
    beforeEach(() => {
      result = HalfCheckerBoardPattern.map((val, idx) =>
        Instruction.FromRow(idx % 2 === 1, val),
      );
    });

    it("captures the correct instructions", () => {
      expect(result[0]).toEqual("(K1, P1) to last stitch K1");
      expect(result[1]).toEqual("(K1, P1) to last stitch K1");
      expect(result[2]).toEqual("(K1, P1) to last stitch K1");
      expect(result[3]).toEqual("(K1, P1) to last stitch K1");
      expect(result[4]).toEqual("K7");
      expect(result[5]).toEqual("P7");
      expect(result[6]).toEqual("K7");
    });
  });
});
