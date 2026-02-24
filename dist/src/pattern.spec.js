import Pattern from "./pattern";
describe("with a pattern", () => {
    let subject;
    describe("when initialised", () => {
        beforeEach(() => {
            subject = Pattern.FromRows([[false, false, false], [false, false, false], [false, false, false]]);
        });
        it("is all false", () => {
            expect(subject.rows[0][0]).toBeFalsy();
            expect(subject.rows[1][2]).toBeFalsy();
            expect(subject.rows[2][2]).toBeFalsy();
        });
    });
});
