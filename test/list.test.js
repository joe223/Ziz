let expect = require("chai").expect;
let Ziz = require("./../dist/Ziz.js");

describe( "list test", () => {
    it("unnested list", () => {
        expect( Ziz("1. list item\n2. list item\n") ).to.be.equal( "<ol><li>list item</li>\n<li>list item</li></ol>\n\r\n");
    })
})
