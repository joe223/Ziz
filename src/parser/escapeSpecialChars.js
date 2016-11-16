/**
 * escape special chars
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    content = content.replace( /</g, "&lt;" );
    content = content.replace( />/g, "&gt;" );
    // content = content.replace( /&/g, "&amp;" );
    content = content.replace( /"/g, "&quot;" );
    content = content.replace( /'/g, "&apos;" );
    return content;
};
