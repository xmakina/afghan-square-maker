"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("./pattern");
describe("with a pattern", () => {
    let subject;
    describe("when initialised", () => {
        beforeEach(() => {
            subject = new pattern_1.default(3, 3);
        });
        it("is all false", () => {
            expect(subject.getAt(0, 0)).toBeFalsy();
            expect(subject.rows[0][0]).toBeFalsy();
            expect(subject.getAt(1, 1)).toBeFalsy();
            expect(subject.getAt(2, 2)).toBeFalsy();
        });
    });
});
