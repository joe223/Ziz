import config from "./blade.config";
import header from "./parser/header";
import table from "./parser/table";
import paragraph from "./parser/paragraph";
import space from "./parser/space";

export default ( content ) => {
    content += "\r\n";
    content = header( content );
    // content = table( content );
    content = paragraph( content );
    // content = space( content );
    return content;
};
