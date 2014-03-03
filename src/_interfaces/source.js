(function(IFace){

    IFace.add('source', {
        isLoaded: false,
        loading: function (callback) {
        },
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
