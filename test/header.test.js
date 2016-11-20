let expect = require("chai").expect;
let Ziz = require("./../dist/Ziz.js");

describe("header test", () => {
    it("header 1", () => {
        expect( Ziz("#this is a header##") ).to.be.equal("<h1>this is a header</h1>\r\n");
        expect( Ziz("#this is a header#") ).to.be.equal("<h1>this is a header</h1>\r\n");
        expect( Ziz("#this is a header") ).to.be.equal("<h1>this is a header</h1>\r\n");
    });
    it("header 1", () => {
        expect( Ziz("this is a header\n=====") ).to.be.equal("<h1>this is a header</h1>\r\n");
    });
    it("header 2", () => {
        expect( Ziz("##this is a header##") ).to.be.equal("<h2>this is a header</h2>\r\n");
        expect( Ziz("##this is a header#") ).to.be.equal("<h2>this is a header</h2>\r\n");
        expect( Ziz("##this is a header") ).to.be.equal("<h2>this is a header</h2>\r\n");
    });
    it("header 2", () => {
        expect( Ziz("this is a header\n-----") ).to.be.equal("<h2>this is a header</h2>\r\n");
    });
    it("header 3", () => {
        expect( Ziz("###this is a header##") ).to.be.equal("<h3>this is a header</h3>\r\n");
        expect( Ziz("###this is a header#") ).to.be.equal("<h3>this is a header</h3>\r\n");
        expect( Ziz("###this is a header") ).to.be.equal("<h3>this is a header</h3>\r\n");
    });
    it("header 4", () => {
        expect( Ziz("####this is a header##") ).to.be.equal("<h4>this is a header</h4>\r\n");
        expect( Ziz("####this is a header#") ).to.be.equal("<h4>this is a header</h4>\r\n");
        expect( Ziz("####this is a header") ).to.be.equal("<h4>this is a header</h4>\r\n");
    });
    it("header 5", () => {
        expect( Ziz("#####this is a header##") ).to.be.equal("<h5>this is a header</h5>\r\n");
        expect( Ziz("#####this is a header#") ).to.be.equal("<h5>this is a header</h5>\r\n");
        expect( Ziz("#####this is a header") ).to.be.equal("<h5>this is a header</h5>\r\n");
    });
    it("header 6", () => {
        expect( Ziz("######this is a header##") ).to.be.equal("<h6>this is a header</h6>\r\n");
        expect( Ziz("######this is a header#") ).to.be.equal("<h6>this is a header</h6>\r\n");
        expect( Ziz("######this is a header") ).to.be.equal("<h6>this is a header</h6>\r\n");
    });
});
