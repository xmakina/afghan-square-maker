import Pattern from "../src/pattern";

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
    beforeEach(() => {
      subject = Pattern.FromRows(
        Array(7)
          .fill(false)
          .map(() => Array(7).fill(false)),
      );

      subject = Pattern.AddBorder(subject);
    });

    it("it has the top of the pattern", () => {
      const patterned = [false, true, false, true, false, true, false];
      expect(subject.rows[0]).toEqual(patterned);
      expect(subject.rows[1]).toEqual(patterned);
      expect(subject.rows[2]).toEqual(patterned);
      expect(subject.rows[3]).toEqual(patterned);
      expect(subject.rows[4]).toEqual(patterned);
      expect(subject.rows[5]).toEqual(patterned);
      expect(subject.rows[6]).toEqual(patterned);
      expect(subject.rows[7]).toEqual(Array(7).fill(false));
    });
  });
});
