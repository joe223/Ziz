/**
 * space
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    let regex = /[\u0020]/gm;
    content = content.replace( regex, "&nbsp;");

    return content;
};
