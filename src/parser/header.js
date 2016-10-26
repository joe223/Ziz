export default ( content ) => {
    for ( let i = 1; i <= 6; i++ ) {
        let tpl = `^#{${i}}[^#]+.*?$`;           // header
        let regex = new RegExp( tpl, "gm" );
        content.replace( regex, () => {

        });
    }
};
