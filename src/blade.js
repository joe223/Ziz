import config from "./blade.config";
import space from "./parser/space";
import header from "./parser/header";
import table from "./parser/table";
import code from "./parser/code";
import paragraph from "./parser/paragraph";
import blockquotes from "./parser/blockquotes";

export default ( content ) => {
    content += "\r\n";
    content = space( content );
    content = header( content );
    // content = table( content );
    content = code( content );
    content = blockquotes ( content );
    content = paragraph( content );
    return content;
};
