/**
 * header 1~6
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    let setextHeader1 = /^(.*)\r?\n(={5,})$/gm;                 // setext style header 1
    let setextHeader2 = /^(.*)\r?\n(-{5,})$/gm;                 // setext style header 2

    for ( let i = 6; i >= 1; i-- ) {
        let atx = `^(#{${i}})([^#]+.*?)((#{${i}})?$)`;          // atx header
        let regex = new RegExp( atx, "gm" );
        content = content.replace( regex, ( $0, $1, $2, index, str ) => {
            return `<h${i}>${$2}</h${i}>`;
        });
    }
    content = content.replace( setextHeader1, ( $0, $1, $2, index, str ) => {
        return `<h1>${$1}</h1>`;
    });
    content = content.replace( setextHeader2, ( $0, $1, $2, index, str) => {
        return `<h2>${$1}</h2>`;
    });
    return content;
};
