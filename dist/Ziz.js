(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Ziz = factory());
}(this, (function () { 'use strict';

var config = {
    highlightCode: false,
    header: true,
    table: true,
    list: true,
    space: false,
    useNestedList: true
};

var escapeSpecialChars = (function (content) {
    content = content.replace(/</g, "&lt;");
    content = content.replace(/>/g, "&gt;");

    content = content.replace(/"/g, "&quot;");
    content = content.replace(/'/g, "&apos;");
    content = content.replace(/\\/g, "&bsol;");
    content = content.replace(/\//g, "&sol;");
    return content;
});

var del = (function (content) {
    var reg = /~~(?!~)(.*)?~~/m;
    content = content.replace(reg, function ($0, $1, $2) {
        return "<del>" + $2 + "</del>";
    });
    return content;
});

var header = (function (content) {
    var setextHeader1 = /^(.*)\r?\n(={5,})$/gm;
    var setextHeader2 = /^(.*)\r?\n(-{5,})$/gm;
    var _loop = function _loop(i) {
        var atx = "^(#{" + i + "})([^#].*?)((#{1,})?$)";
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

var link = (function (content) {
    var inlineLinkRegex = /\[([^\[].*?)\]\((.*?)((?:\u0020*)&quot;(.*?)&quot;)?\)/gm;
    content = content.replace(inlineLinkRegex, function ($0, $1, $2, $3, $4) {
        var text = $1;
        var url = $2;
        var title = $4;
        return "<a href=\"" + url + "\" title=\"" + title + "\">" + text + "</a>";
    });

    return content;
});

var list = (function (content) {
    var arr = content.split(/\n/);
    var newArr = [];
    if (!config.useNestedList) {
        newArr = checkListItem(arr, 0, false);
    } else {
        newArr = checkListItem(arr, 0, true);
    }
    return newArr.join("\n");
});

function checkListItem(arr, indent, nested) {
    var ulStart = "<ul>";
    var ulEnd = "</ul>";
    var olStart = "<ol>";
    var olEnd = "</ol>";

    var isItem = /^(?:(?:<ol>|<ul>)?<li>)(.*?)(?:<\/li>(?:<\/ol>|<\/ul>)?)$/;
    var reg = new RegExp("(?:^(?:\\t|(?:\\u0020){4}){" + indent + "})(?:(\\*|\\+|\\-|\\d\\.)(?:\\u0020)+)(.*?)$", "mi");
    var testIndentReg = new RegExp("(?:^(?:\\t|(?:\\u0020){4}){" + (indent + 1) + "})(?:(\\*|\\+|\\-|\\d\\.)(?:\\u0020)+)(.*?)$", "mi");
    var isUnorderedList = new RegExp("(?:^(?:\\t|(?:\\u0020){4}){" + indent + "})(([\\*|\\+|\\-])(\\u0020)+)(.*?)$", "i");
    var isOrderedList = new RegExp("(?:^(?:\\t|(?:\\u0020){4}){" + indent + "})((^[\\d]\\.)(\\u0020)+)(.*?)$", "i");

    if (testIndentReg.test(arr.join("\n")) && nested) {
        arr = checkListItem(arr, indent + 1);
    }

    var isFirstListItem = true;
    var isNestedListStart = true;
    var length = arr.length;
    var newArr = arr.map(function (item, index, arr) {
        if (isUnorderedList.test(item)) {
            item = item.replace(isUnorderedList, function ($0, $1, $2, $3, $4, index, str) {
                return "<li>" + $4 + "</li>";
            });
            if (isFirstListItem) {
                item = ulStart + item;
            }
            if (index === length - 1 || !isUnorderedList.test(arr[index + 1]) && !isItem.test(arr[index + 1])) {
                item = item + ulEnd;
            }
            isFirstListItem = false;
        } else {
            isFirstListItem = true;
        }
        return item;
    });

    isFirstListItem = false;
    console.log(newArr);
    newArr = newArr.map(function (item, index, arr) {
        if (isOrderedList.test(item)) {
            item = item.replace(isOrderedList, function ($0, $1, $2, $3, $4, index, str) {
                return "<li>" + $4 + "</li>";
            });
            if (!isFirstListItem) {
                item = olStart + item;
            }
            if (!arr[index + 1] || !isOrderedList.test(arr[index + 1]) && !isItem.test(arr[index + 1])) {
                item = item + olEnd;
            }
            isFirstListItem = true;
        } else {
            isFirstListItem = false;
        }
        return item;
    });

    newArr = newArr.map(function (item, index, arr) {});
    return newArr;
}

var table = (function (content) {
  var a = [1, 2, 3];
  return content;
});

var code = (function (content) {
    var regCodeBlock = /(^(\u0020)*`{3}(\w|\-|\.|\+|\-{1,10})?)((\n.*?)+)(`{3}$)/gm;
    var isCode = /\<code\>(.*?)\<\/code\>/;
    var hasLineBreak = /\r?\n/;
    content = content.replace(regCodeBlock, function ($0, $1, $2, $3, $4, $5, $6, index, str) {
        var text = $4;
        var lang = $3 ? $3.toLowerCase() : "nohighlight";
        text = "<pre><code class='" + lang + "'>" + text + "</code></pre>";
        return text;
    });

    var arr = content.split(/\n/);
    var newContent = arr.map(function (item, index) {
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
        return item;
    });
    return newContent.join("\n");
});

var paragraph = (function (content) {
    var arr = content.split(/\n/);
    var isHTML = /^<[a-zA-Z0-9]{1,11}(\s.{1,18})?>.*<\/[a-zA-Z0-9]{1,11}>$/;
    var isSpace = /^\u0020+|\r|\n$/;
    var isCodeStart = /^(<pre>)?<code>$/;
    var isCodeEnd = /^<\/code>(<pre>)?/;
    var status = false;
    var newContent = arr.map(function (item, index, arr) {
        var str = "";

        if (!isHTML.test(item) && !isSpace.test(item) && item !== "") {
            str = "<p>" + item + "</p>";
        } else {
            str = item;
        }
        return str;
    });
    newContent = newContent.join("\n");
    return newContent;
});

var blockquotes = (function (content) {
    var regex = /(^((\u0020)*>+(\u0020)*)+)(.*)([^>]$)/gm;
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

    content = escapeSpecialChars(content);

    content = header(content);
    content = link(content);

    content = table(content);
    content = code(content);
    content = list(content);
    content = blockquotes(content);
    content = del(content);
    content = paragraph(content);
    return content;
}

return Ziz;

})));
//# sourceMappingURL=Ziz.js.map
