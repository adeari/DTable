(function(IFace){

    IFace.add('source', {
        /**
         * must return the following format:
         *
         * [{
         *   <column_id> : <data>,
         *   ...
         * }, ... ]
         */
        getRows: function () {
        },
        getCount: function () {
        }
    });


}(DTableInterfaces));