(function(IFace){

    IFace.add('pagination', {
        /**
         * current page
         * @return int
         */
        getPage: function () {
        },
        /**
         * set current page
         * @param page
         */
        setPage: function (page) {
        },
        /**
         * have to show first and last page?
         */
        getShowFirstLast: function () {
        },
        /**
         * number of pages to show in pagination, odd number!
         */
        getPageNum: function () {
        },
        /**
         * get rows per page
         */
        getRowsPerPage: function () {
        },
        /**
         * set rows per page
         * @param page
         */
        setRowsPerPage: function (page) {
        },
        /**
         * max page num
         */
        getMaxPage: function () {
        },
        /**
         * array contains pages to show in pagination
         */
        getPagesArr: function () {
        },
        /**
         * offset to post in query
         */
        getOffset: function () {
        },
        /**
         * rows per page select, return array with options
         */
        getRowsPerPageSelect: function () {
        }
    });


}(DTableInterfaces));