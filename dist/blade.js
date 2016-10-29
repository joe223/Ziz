(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.blade = factory());
}(this, (function () { 'use strict';

/**
 * header 1~6
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
var header = (function (content) {
    var setextHeader1 = /^(.*)\r?\n(={5,})$/gm; // setext style header 1
    var setextHeader2 = /^(.*)\r?\n(-{5,})$/gm; // setext style header 2

    var _loop = function _loop(i) {
        var atx = "^(#{" + i + "})([^#].*?)((#{1,})?$)"; // atx header
        var regex = new RegExp(atx, "gm");
        content = content.replace(regex, function ($0, $1, $2, index, str) {
            // console.log($2)
            return "<h" + i + ">" + $2 + "</h" + i + ">";
        });
    };

    for (var i = 6; i >= 1; i--) {
        _loop(i);
    }
    content = content.replace(setextHeader1, function ($0, $1, $2, index, str) {
        return "<h1>" + $1 + "</h1>";
    });
    content = content.replace(setextHeader2, function ($0, $1, $2, index, str) {
        return "<h2>" + $1 + "</h2>";
    });
    return content;
});

/**
 * table
 * @return {[type]} [description]
 */

var paragraph = (function (content) {
    // let regex = /^.*\w+$/gm;
    // content = content.replace( regex, ( $0, $1 ) => {
    //     return `<p>${$1}</p>`;
    // });
    var arr = content.split(/\n/g);
    var isHTML = /^<[a-zA-Z0-9]{1,3}(\s.{1,18})?>.*<\/[a-zA-Z0-9]{1,3}>$/; // no globally
    var isSpace = /^[\u0020]+|\r|\n$/; // space & line break
    var newContent = "";

    arr.map(function (item, index, arr) {
        // console.log(item);
        var str = "";
        item = item.replace(/\s/g, "");
        if (!isHTML.test(item) && !isSpace.test(item) && item !== "") {
            str = "<p>" + item + "</p>";
        } else {
            str = item;
        }
        // console.log("str:" + str);
        newContent += str;
    });
    return newContent;
});

var space = (function (content) {
    var regex = /[\u0020]/gm;
    content = content.replace(regex, "&nbsp;");

    return content;
});

var blade = (function (content) {
    content += "\r\n";
    content = space(content);
    content = header(content);
    // content = table( content );
    content = paragraph(content);
    return content;
});

return blade;

})));
//# sourceMappingURL=blade.js.map
