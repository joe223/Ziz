// ^```(.*|\n)+?([^`]){3,}```$
// ^```(.*|\n)+?([^`]){3,}```$

// /(^[\u0020]*`{3}([a-zA-z]{3,10})?)(\n.*?)+`{3}$/gm              // code block with ``` ==> <pre><code> </code><pre>
// /([\u0020]*`{3})(.*?)(`{3})/gm                                  // inline code with ```  ==> <code> <code>
// /([\u0020]*`{2})(.*?)(`{2})/gm                                  // inline code with ``  ==> <code> <code>
// /([\u0020]*`)(.*?)(`)/gm                                        // inline code with  ` ==> <code> <code>

export default ( content ) => {
    const inlineCodeStart = "<code>";
    const inlineCodeEnd = "</code>";
    // const codeBlockStart = "<pre><code>";
    const codeBlockEnd = "</code></pre>";

    /** convert codeBlock */
    let regCodeBlock = /(^(&nbsp;)*`{3}([a-zA-z]{3,10})?)((\n.*?)+)(`{3}$)/gm;
    content = content.replace( regCodeBlock, ( $0, $1, $2, $3, $4, $5, $6, index, str ) => {
        let text = $4;
        console.log($2);
        console.log($3);
        console.log($4);
        console.log($5);
        let lang = $3 ? $3.toLowerCase() : "nohighlight";               // language
        text = "<pre><code>" + text + "</code></pre>";
        console.log(text);
        return text;
    });
    // console.log( content );
    return content;
}
