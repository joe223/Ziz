/**
* list
* @param  {[type]} content [description]
* @return {[type]}         [description]
*/
import config from "../ziz.config";

export default ( content ) => {
    let arr = content.split( /\n/ );
    let newArr = [];
    if ( !config.useNestedList ) {
        newArr = checkListItem( arr, 0, false );
    } else {
        newArr = checkListItem( arr, 0, true );
    }
    return newArr.join( "\n" );
};





function checkListItem ( arr, indent, nested ) {
    // test "1. adfsdf".match(reg)
    // => ["1. adfsdf", "1.", "adfsdf"] ( string, type, content )
    const ulStart = "<ul>";
    const ulEnd = "</ul>";
    const olStart = "<ol>";
    const olEnd = "</ol>";

    const isNestedList = /^(?:(?:<ol>|<ul>)?<li>)(.*?)(?:<\/li>(?:<\/ol>|<\/ul>)?)$/;
    const reg = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})(?:(\\*|\\+|\\-|\\d\\.)(?:\\u0020)+)(.*?)$`, "mi" );
    const testIndentReg = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent + 1 }})(?:(\\*|\\+|\\-|\\d\\.)(?:\\u0020)+)(.*?)$`, "mi" );
    const isUnorderedList = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})(([\\*|\\+|\\-])(\\u0020)+)(.*?)$`, "i" );
    const isOrderedList = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})((^[\\d]\\.)(\\u0020)+)(.*?)$`, "i" );

    // if there is an another list
    if ( testIndentReg.test( arr.join( "\n" ) ) && nested ) {
        arr = checkListItem( arr, indent + 1, true );
    }
    console.warn( "checkListItem:" + indent );
    // unordered list
    let isFirstListItem = true;
    let isNestedListStart = true;
    let length = arr.length;



    // nested list
    let newArr = arr.map( ( item, index, arr ) => {
        let lastIsOListitem = false;
        let lastIsUListitem = false;
        let last = arr[index - 1];
        let next = arr[index + 1];
        if ( last ) {
            if ( isUnorderedList.test( last ) ) lastIsUListitem = true;
            if ( isOrderedList.test( last ) ) lastIsOListitem = true;
        }
        if ( isNestedList.test( item ) ) {
            if ( isNestedListStart && ( lastIsOListitem || lastIsUListitem ) ) {
                item = "<li>" + item;
                isNestedListStart = false;
            }
            if ( next === undefined || !isNestedList.test( next ) ) {
                item = item + "</li>";
                isNestedListStart = true;
            }
            console.log( "nest==========>,next:%s,isNestedList:%s",next,isNestedList.test( next ) );

        }
        return item;
    });
    console.log( newArr )

    newArr = newArr.map( ( item, index, arr ) => {
        let last = arr[index - 1];
        let next = arr[index + 1];
        if ( isUnorderedList.test( item ) || isNestedList.test( item ) ) {
            item = item.replace( isUnorderedList, ( $0, $1, $2, $3, $4, index, str ) => {
                return "<li>" + $4 + "</li>";
            });
            if ( isFirstListItem ) {
                item = ulStart + item;
            }
            if ( index === ( length - 1 ) || ( !isUnorderedList.test( next ) && !isNestedList.test( next ) ) ) {
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
        let last = arr[index - 1];
        let next = arr[index + 1];
        if ( isOrderedList.test( item ) ) {
            item = item.replace( isOrderedList, ( $0, $1, $2, $3, $4, index, str ) => {
                return "<li>" + $4 + "</li>";
            });
            if ( !isFirstListItem ) {
                item = olStart + item;
            }
            if ( !arr[index + 1] || ( !isOrderedList.test( next ) && !isNestedList.test( next ) ) ) {
                item = item + olEnd;
            }
            isFirstListItem = false;
        } else {
            if ( isNestedList.test( item ) ) {

            }
            isFirstListItem = true;
        }

        return item;
    });

    console.log( newArr )

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
