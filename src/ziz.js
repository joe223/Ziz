import config from "./ziz.config";
// import space from "./parser/space";
import escapeSpecialChars from "./parser/escapeSpecialChars";
import del from "./parser/del";
import header from "./parser/header";
import link from "./parser/link";
import list from "./parser/list";
import table from "./parser/table";
import code from "./parser/code";
import paragraph from "./parser/paragraph";
import blockquotes from "./parser/blockquotes";

export default function Ziz ( content ) {
    content += "\r\n";
    // content = space( content );
    // TODO: delete space
    content = escapeSpecialChars( content );
    // TODO: fix this
    content = header( content );
    content = link( content );
    // TODO: fixed table
    content = table( content );
    content = code( content );
    content = list( content );
    content = blockquotes ( content );
    content = del( content );
    content = paragraph( content );
    return content;
}
