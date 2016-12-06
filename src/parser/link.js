/**
 * link
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    // inline link
    const inlineLinkRegex = /\[([^\[].*?)\]\((.*?)((?:\u0020*)&quot;(.*?)&quot;)?\)/gm;
    content = content.replace( inlineLinkRegex, ( $0, $1, $2, $3, $4 ) => {
        let text = $1;
        let url = $2;
        let title = $4;
        return `<a href="${ url }" title="${ title }">${ text }</a>`;
    });
    // TODO: reference style links
    // console.log( content )
    return content;
}
