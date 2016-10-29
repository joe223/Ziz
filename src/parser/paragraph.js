export default ( content ) => {
    // let regex = /^.*\w+$/gm;
    // content = content.replace( regex, ( $0, $1 ) => {
    //     return `<p>${$1}</p>`;
    // });
    let arr = content.split( /\n/g );
    let isHTML = /^<[a-zA-Z0-9]{1,3}(\s.{1,18})?>.*<\/[a-zA-Z0-9]{1,3}>$/;      // no globally
    let isSpace = /^[\u0020]+|\r|\n$/;                     // space & line break
    let newContent = "";

    arr.map( ( item, index, arr ) => {
        // console.log(item);
        let str = "";
        item = item.replace( /\s/g, "" );
        if ( !isHTML.test( item ) && !isSpace.test( item ) && item !== "" ) {
            str = `<p>${item}</p>`;
        } else {
            str = item;
        }
        // console.log("str:" + str);
        newContent += str;
    });
    return newContent;
};
