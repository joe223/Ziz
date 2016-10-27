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
        var atx = "^(#{" + i + "})([^#]+.*?)((#{" + i + "})?$)"; // atx header
        var regex = new RegExp(atx, "gm");
        content = content.replace(regex, function ($0, $1, $2, index, str) {
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
    var regex = /^(.*)$/gm;
    content = content.replace(regex, function ($0, $1) {
        return "<p>" + $1 + "</p>";
    });
    return content;
});

var space = (function (content) {
    var regex = /^$/gm;
    content.replace(regex, function ($0) {
        return "<br>";
    });
    return content;
});

var blade = (function (content) {
    content += "\r\n";
    content = header(content);
    // content = table( content );
    content = paragraph(content);
    content = space(content);
    return content;
});

return blade;

})));
//# sourceMappingURL=blade.js.map
