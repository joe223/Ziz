/**
 * Blockquotes (nested)
 * @param  {[type]} content [description]
 * @return {[type]}         [description]s
 */
export default ( content ) => {
    let regex = /(^((&nbsp;)*>+(&nbsp;)*)+)(.*)([^>]$)/gm;         // (^>+(&nbsp;)*)+(.*)([^>]$)
    content = content.replace( regex, ( $0, $1, $2, $3, $4, $5, index, str ) => {
        let blockquoteStart = "<blockquotes>";
        let blockquoteEnd = "</blockquotes>";
        let count = 0;
        let reg = />/g;
        while ( reg.test( $1 ) ) {
            count++;
        }
        return `${blockquoteStart.repeat( count )}${$5}${blockquoteEnd.repeat( count )}`;
    });
    return content;
};
