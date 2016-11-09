(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Ziz = factory());
}(this, (function () { 'use strict';

/**
 * ziz configrue
 */

/**
 * space
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
var space = (function (content) {
  var regex = /[\u0020]/gm; // ^(?!>#)*[\u0020]+    |   (^(?!>#)*)?[\u0020]
  content = content.replace(regex, "&nbsp;");
  return content;
});

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

// ^```(.*|\n)+?([^`]){3,}```$
// ^```(.*|\n)+?([^`]){3,}```$

// /(^[\u0020]*`{3}([a-zA-z]{3,10})?)(\n.*?)+`{3}$/gm              // code block with ``` ==> <pre><code> </code><pre>
// /([\u0020]*`{3}[^`])(.*?)(`{3})/gm                                  // inline code with ```  ==> <code> <code>
// /([\u0020]*`{2}[^`])(.*?)(`{2})/gm                                  // inline code with ``  ==> <code> <code>
// /([\u0020]*`[^`])(.*?)(`)/gm                                        // inline code with  ` ==> <code> <code>

var code = (function (content) {
    /** convert codeBlock */
    var regCodeBlock = /(^(&nbsp;)*`{3}([a-zA-z]{3,10})?)((\n.*?)+)(`{3}$)/gm;
    var isCode = /\<code\>(.*?)\<\/code\>/;
    var hasLineBreak = /\r?\n/;
    content = content.replace(regCodeBlock, function ($0, $1, $2, $3, $4, $5, $6, index, str) {
        var text = $4;
        var lang = $3 ? $3.toLowerCase() : "nohighlight"; // language
        text = "<pre><code class='" + lang + "'>" + text + "</code></pre>";
        return text;
    });
    /** inline code with ``` .* ``` */
    var arr = content.split(/\n/);
    var newContent = "";
    arr.map(function (item, index) {
        console.log(item);
        for (var i = 3; i >= 1; i--) {
            var inlineCode = "(`{" + i + "})([^`]{1,}.*?[^`]*)(`{" + i + "})";
            var regex = new RegExp(inlineCode, "g");
            item = item.replace(regex, function ($0, $1, $2, $3, index, str) {
                var text = $2;
                if (!isCode.test(text) && $2.length > 0 && !hasLineBreak.test(text)) {
                    text = "<code>" + text + "</code>";
                    return text;
                } else {
                    return $0;
                }
            });
        }
        item += "\n";
        newContent += item;
    });
    console.log(newContent);
    return newContent;
});

/**
 * paragraph
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
var paragraph = (function (content) {
    var arr = content.split(/\n/g);
    var isHTML = /^<[a-zA-Z0-9]{1,11}(\s.{1,18})?>.*<\/[a-zA-Z0-9]{1,11}>$/; // no globally
    var isSpace = /^[\u0020]+|\r|\n$/; // space & line break
    var isCodeStart = /^(<pre>)?<code>$/;
    var isCodeEnd = /^<\/code>(<pre>)?/;
    var newContent = "";
    var status = false;
    arr.map(function (item, index, arr) {
        // console.log(item);
        var str = "";
        if (isCodeStart.test(item) || status) {
            status = true;
            newContent += item + "\r\n";
            return;
        }
        if (isCodeEnd.test(item)) {
            status = false;
            newContent += item + "\r\n";
            return;
        }
        // item = item.replace( /\s/g, "" );           // TODO: should keep space
        if (!isHTML.test(item) && !isSpace.test(item) && item !== "") {
            str = "<p>" + item + "</p>";
        } else {
            str = item;
        }
        newContent += str;
    });

    return newContent;
});

/**
 * Blockquotes (nested)
 * @param  {[type]} content [description]
 * @return {[type]}         [description]s
 */
var blockquotes = (function (content) {
    var regex = /(^((&nbsp;)*>+(&nbsp;)*)+)(.*)([^>]$)/gm; // (^>+(&nbsp;)*)+(.*)([^>]$)
    content = content.replace(regex, function ($0, $1, $2, $3, $4, $5, index, str) {
        var blockquoteStart = "<blockquotes>";
        var blockquoteEnd = "</blockquotes>";
        var count = 0;
        var reg = />/g;
        while (reg.test($1)) {
            count++;
        }
        return "" + blockquoteStart.repeat(count) + $5 + blockquoteEnd.repeat(count);
    });
    return content;
});

function Ziz(content) {
    content += "\r\n";
    content = space(content);
    content = header(content);
    // TODO: fixed table
    // content = table( content );
    content = code(content);
    content = blockquotes(content);
    content = paragraph(content);
    return content;
}

return Ziz;

})));
//# sourceMappingURL=Ziz.js.map
