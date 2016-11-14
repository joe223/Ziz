import config from "./ziz.config";
import space from "./parser/space";
import header from "./parser/header";
import list from "./parser/list";
import table from "./parser/table";
import code from "./parser/code";
import paragraph from "./parser/paragraph";
import blockquotes from "./parser/blockquotes";

export default function Ziz ( content ) {
    content += "\r\n";
    content = space( content );
    content = header( content );
    // TODO: fixed table
    // content = table( content );
    content = code( content );
    content = list( content );
    content = blockquotes ( content );
    content = paragraph( content );
    return content;
}
