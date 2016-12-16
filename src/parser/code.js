export default ( content ) => {
    /** convert codeBlock */
    let regCodeBlock = /(^(?:\u0020)*`{3}((\w|\-|\.|\+|-|#){1,10})?)((\n.*?)+)(?:`{3}$)/gm;
    // let regCodeBlock = /(^(\u0020)*`{3}(\w|\-|\.|\+|\-{1,10})?)((\n.*?)+)(`{3}$)/gm;
    let isCode = /\<code\>(.*?)\<\/code\>/;
    let hasLineBreak = /\r?\n/;
    content = content.replace( regCodeBlock, ( $0, $1, $2, $3, $4, $5, index, str ) => {
        let text = $4;
        let lang = $2 ? $3.toLowerCase() : "nohighlight";               // language
        text = "<pre><code class='" + lang + "'>" + text + "</code></pre>";
        return text;
    });
    /** inline code with ``` .* ``` */
    let arr = content.split( /\n/ );
    let newContent = arr.map( ( item, index ) => {
        for ( let i = 3; i >= 1; i-- ) {
            let inlineCode = `(\`{${i}})([^\`]{1,}.*?[^\`]*)(\`{${i}})`;
            let regex = new RegExp( inlineCode, "g" );
            item = item.replace( regex, ( $0, $1, $2, $3, index, str ) => {
                let text = $2;
                if ( !isCode.test( text ) && $2.length > 0 && !hasLineBreak.test( text ) ) {
                    text = "<code>" + text + "</code>";
                    return text;
                } else {
                    return $0;
                }
            });
        }
        return item;
    });
    return newContent.join( "\n" );
};
