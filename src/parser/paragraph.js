/**
 * paragraph
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    let arr = content.split( /\n/g );
    let isHTML = /^<[a-zA-Z0-9]{1,11}(\s.{1,18})?>.*<\/[a-zA-Z0-9]{1,11}>$/;      // no globally
    let isSpace = /^[\u0020]+|\r|\n$/;                                          // space & line break
    let isCodeStart = /^(<pre>)?<code>$/;
    let isCodeEnd = /^<\/code>(<pre>)?/;
    let newContent = "";
    let status = false;
    arr.map( ( item, index, arr ) => {
        // console.log(item);
        let str = "";
        if ( isCodeStart.test( item ) || status ) {
            status = true;
            newContent += ( item + "\r\n" );
            return;
        }
        if ( isCodeEnd.test( item ) ) {
            status = false;
            newContent += ( item + "\r\n" );
            return;
        }
        // item = item.replace( /\s/g, "" );           // TODO: should keep space
        if ( !isHTML.test( item ) && !isSpace.test( item ) && item !== "" ) {
            str = `<p>${item}</p>`;
        } else {
            str = item;
        }
        newContent += str;
    });

    return newContent;
};
