let expect = require("chai").expect;
let Ziz = require("./../dist/Ziz.js");

describe("header test", () => {
    it("header 1", () => {
        expect( Ziz("#this is a header##") ).to.be.equal("<h1>this is a header</h1>\r");
        expect( Ziz("#this is a header#") ).to.be.equal("<h1>this is a header</h1>\r");
        expect( Ziz("#this is a header") ).to.be.equal("<h1>this is a header</h1>\r");
    });
});
