/**
 * header 1~6
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    for ( let i = 1; i <= 6; i++ ) {
        let tpl = `^#{${i}}[^#]+.*?$`;           // header
        let regex = new RegExp( tpl, "gm" );
        content = content.replace( regex, () => {
            return `<h${i}>header</h${i}>`;
        });
    }
    return content;
};
