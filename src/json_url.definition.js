/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
 */
(function (DTableModule, $) {

    DTableModule.newModule(DTableModule.MODULE_DEFINITION, "json_url", {
        init: function (options, dtable) {
            this.definition = {};
            this.isLoaded = false;

            var defaults = {
                method:    "get",
                url:       "",
                data:      {},
                timestamp: false
            };

            this.dtable = dtable;
            this.options = $.extend({}, defaults, options);
        },
        getTitle:      function () {
            return this.definition.title;
        },
        getColumns:    function () {
            return this.definition.columns;
        },
        getPagination: function () {
            return {
               show_first_last: this.dtable.pagination.getShowFirstLast(),
               pages: this.dtable.pagination.getPageNum(),
               rows_per_page: this.dtable.pagination.getRowsPerPage()
            };
        },
        getSearch:        function () {
            return this.definition.search;
        },
        hasColumnFilter: function(){
            return this.definition.has_column_filter;
        },
        loading:       function (callback) {
            var url = this.options.url;
            var obj = this;

            if (this.options.timestamp) {
                url = url + "?" + new Date().getTime();
            }

            function success(data) {
                obj.definition = data;
                obj.isLoaded = true;
                obj.dtable.logger.info("json_url.definition: resource is loaded");

                $.each(obj.getColumns(), function(key, value){
                    if (value.filter)
                    {
                        obj.definition.has_column_filter = true;
                    }
                });

                callback();
            }

            function error() {
                obj.dtable.logger.error("Can't load definition resource from " + url);
            }

            if (this.options.method == "get") {
                $.get(url, this.options.data, success, "json").error(error);
            } else {
                $.post(url, this.options.data, success, "json").error(error);
            }
        }
    });

}(DTableModule, jQuery));
