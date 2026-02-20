import { Pattern } from "./pattern";

describe("with a pattern", () => {
  let subject: Pattern;

  describe("when initialised", () => {
    beforeEach(() => {
      subject = new Pattern(3, 3);
    });

    it("is all false", () => {
      expect(subject.getAt(0, 0)).toBeFalsy();
      expect(subject.getAt(1, 1)).toBeFalsy();
      expect(subject.getAt(2, 2)).toBeFalsy();
    });
  });
});
