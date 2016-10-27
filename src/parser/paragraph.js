export default ( content ) => {
    let regex = /^(.*)$/gm;
    content = content.replace( regex, ( $0, $1 ) => {
        return `<p>${$1}</p>`;
    });
    return content;
};
