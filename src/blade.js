import header from "./parser/header";
import table from "./parser/table";

export default ( content ) => {
    content = header( content );
    return content;
};
