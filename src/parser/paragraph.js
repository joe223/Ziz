/**
 * paragraph
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    let arr = content.split( /\n/g );
    let isHTML = /^<[a-zA-Z0-9]{1,11}(\s.{1,18})?>.*<\/[a-zA-Z0-9]{1,11}>$/;      // no globally
    let isSpace = /^[\u0020]+|\r|\n$/;                                          // space & line break
    let newContent = "";

    arr.map( ( item, index, arr ) => {
        let str = "";
        item = item.replace( /\s/g, "" );
        if ( !isHTML.test( item ) && !isSpace.test( item ) && item !== "" ) {
            str = `<p>${item}</p>`;
        } else {
            str = item;
        }
        newContent += str;
    });

    return newContent;
};
