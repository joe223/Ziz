export default ( content ) => {
    let regex = /[\u0020]/gm;
    content = content.replace( regex, "&nbsp;");

    return content;
};
