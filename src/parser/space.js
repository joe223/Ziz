export default ( content ) => {
    let regex = /^$/gm;
    content.replace( regex, ( $0 ) => {
        return "<br>";
    });
    return content;
};
