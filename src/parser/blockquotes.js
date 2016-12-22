/**
 * Blockquotes (nested)
 * @param  {[type]} content [description]
 * @return {[type]}         [description]s
 */
export default ( content ) => {
    const regex = /(^((?:\u0020)*(?:&gt;))+(?:\u0020)*)+(.*?)$/gm;         // (^>+(\u0020)*)+(.*)([^>]$)
    // const regex = /(^((\u0020)*>+(\u0020)*)+)(.*)([^>]$)/gm;         // (^>+(\u0020)*)+(.*)([^>]$)
    const blockquoteStart = "<blockquote>";
    const blockquoteEnd = "</blockquote>";
    content = content.replace( regex, ( $0, $1, $2, $3, index, str ) => {

        let count = 0;
        let reg = /&gt;/g;
        // console.log( $1 );
        // console.log( $2 );
        while ( reg.test( $1 ) ) {
            count++;
            console.log( "blockquotes" );
        }
        // console.log( $3 );
        // console.log( `${blockquoteStart.repeat( count )}${$3}${blockquoteEnd.repeat( count )}` );
        return `${blockquoteStart.repeat( count )}${$3}${blockquoteEnd.repeat( count )}`;
    });
    return content;
};
