import config from "./ziz.config";
// import space from "./parser/space";
import escapeSpecialChars from "./parser/escapeSpecialChars";
import del from "./parser/del";
import italic from "./parser/italic";
import bold from "./parser/bold";
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
    content = del( content );
    content = bold( content );
    content = italic( content );
    content = code( content );
    // TODO: fix this
    content = header( content );
    content = link( content );
    // TODO: fixed table
    content = table( content );
    content = list( content );
    content = blockquotes ( content );
    content = paragraph( content );
    return content;
}
