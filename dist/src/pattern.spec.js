import Pattern from "./pattern";
describe("with a pattern", () => {
    let subject;
    describe("when initialised", () => {
        beforeEach(() => {
            subject = Pattern.FromRows([[true, false, false], [false, true, false], [false, false, true]]);
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
});
