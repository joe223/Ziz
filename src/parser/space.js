/**
 * space
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    let regex = /\u0020/gm;               // ^(?!>#)*\u0020+    |   (^(?!>#)*)?\u0020
    content = content.replace( regex, "\u0020");
    return content;
};
