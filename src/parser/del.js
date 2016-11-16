/**
 * Deleted Text Element
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    let reg = /~~(?!~)(.*)?~~/m;
    content = content.replace( reg, ( $0, $1, $2 ) => {
        return "<del>" + $2 + "</del>";
    });
    return content;
};
