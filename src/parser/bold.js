/**
 * Bold Text Element
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    let reg = /\*\*(?!\*)(.*?)\*\*/m;
    content = content.replace( reg, ( $0, $1, index, str ) => {
        return "<strong>" + $1 + "</strong>";
    });
    return content;
};
