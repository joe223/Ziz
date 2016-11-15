/**
 * list
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export default ( content ) => {
    const ulStart = "<ul>";
    const ulEnd = "</ul>";
    const olStart = "<ol>";
    const olEnd = "</ol>";
    const isUnorderedList = /(([\*|\+|\-])(&nbsp;)+)(.*?)$/;
    const isOrderedList = /((^[\d]\.)(&nbsp;)+)(.*?)$/;
    let arr = content.split( /\n/ );

    // unordered list
    let isFirstListItem = true;
    let length = arr.length;
    console.log(arr);
    console.log(isUnorderedList.test( arr[1] ));

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
};
