/**
 * Deleted Text Element
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
 export default ( content ) => {
     let reg = /\*(?!\*)(.*?)\*/m;
     content = content.replace( reg, ( $0, $1, index, str ) => {
         return "<em>" + $1 + "</em>";
     });
     return content;
 };
