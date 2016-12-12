/**
* list
* @param  {[type]} content [description]
* @return {[type]}         [description]
*/
import config from "../ziz.config";

export default ( content ) => {

    const ulStart = "<ul>";
    const ulEnd = "</ul>";
    const olStart = "<ol>";
    const olEnd = "</ol>";

    if ( !config.useNestedList ) {
        const isUnorderedList = /(([\*|\+|\-])(\u0020)+)(.*?)$/;
        const isOrderedList = /((^[\d]\.)(\u0020)+)(.*?)$/;
        let arr = content.split( /\n/ );

        // unordered list
        let isFirstListItem = true;
        let length = arr.length;
        // console.log(arr);
        // console.log(isUnorderedList.test( arr[1] ));+

        let newArr = arr.map( ( item, index, arr ) => {
            if ( isUnorderedList.test( item ) ) {
                item = item.replace( isUnorderedList, ( $0, $1, $2, $3, $4, index, str ) => {
                    return "<li>" + $4 + "</li>";
                });
                if ( isFirstListItem ) {
                    item = ulStart + item;
                }
                if ( index === ( length - 1 ) || !isUnorderedList.test( arr[index + 1] ) ) {
                    item = item + ulEnd;
                }
                isFirstListItem = false;
            } else {
                isFirstListItem = true;
            }
            return item;
        });

        // ordered list
        isFirstListItem = false;
        newArr = newArr.map( ( item, index, arr ) => {
            if ( isOrderedList.test( item ) ) {
                item = item.replace( isOrderedList, ( $0, $1, $2, $3, $4, index, str ) => {
                    return "<li>" + $4 + "</li>";
                });
                if ( !isFirstListItem ) {
                    item = olStart + item;
                }
                if ( !arr[index + 1] || !isOrderedList.test( arr[index + 1] ) ) {
                    item = item + olEnd;
                }
                isFirstListItem = true;
            } else {
                isFirstListItem = false;
            }
            return item;
        });
        content = newArr.join("\n");
        return content;
    } else {
        let arr = content.split( /\n/ );
        let newArr = checkListItem( arr, 0 );
        return content;        
    }
    
};

function checkListItem ( arr, indent ) {
    // test "1. adfsdf".match(reg)
    // => ["1. adfsdf", "1.", "adfsdf"] ( string, type, content )
    let reg = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})(?:(\\*|\\+|\\-|\\d\\.)(?:\\u0020)+)(.*?)$`, "mi" );
    let newArr = arr.map( ( item ) => {
        return item;
    });
    return newArr;
}


// isUnorderedList = (^(\t|(\u0020){4})*)((?:[\*|\+|\-])(?:\u0020)+)(.*?)$
//
//
//
// * asdfasdfasdfa是
// + asdfasdfasdfa2
// - asdfasdfasdfa1
//
// 1. 23123
// 2. 23123
//     * asdfasdfasdfa是
//     + asdfasdfasdfa2
// 		1. 23123
// 		3. 23123
//     - asdfasdfasdfa1
// 3. 23123
//
//
// (^(\t|(\u0020){4})*)((?:[\*\+\-])(?:\u0020)+)(.*?)$ // 匹配无序列表，