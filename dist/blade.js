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
    var _loop = function _loop(i) {
        var tpl = "^#{" + i + "}[^#]+.*?$"; // header
        var regex = new RegExp(tpl, "gm");
        content = content.replace(regex, function () {
            return "<h" + i + ">header</h" + i + ">";
        });
    };

    for (var i = 1; i <= 6; i++) {
        _loop(i);
    }
    return content;
});

/**
 * table
 * @return {[type]} [description]
 */

var blade = (function (content) {
    content = header(content);
    return content;
});

return blade;

})));
//# sourceMappingURL=blade.js.map
