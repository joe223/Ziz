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
    content = content.replace( /\\/g, "&bsol;" );
    content = content.replace( /\//g, "&sol;" );
    return content;
};
