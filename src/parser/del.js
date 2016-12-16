/**
 * Deleted Text Element
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    let reg = /~~(?!~)(.*?)~~/m;
    content = content.replace( reg, ( $0, $1, index, str ) => {
        return "<del>" + $1 + "</del>";
    });
    return content;
};
