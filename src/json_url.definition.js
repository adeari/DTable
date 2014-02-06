/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
 */
(function (DTableModule, $) {

    DTableModule.newModule(DTableModule.MODULE_DEFINITION, "json_url", {
        init:            function (options, dtable) {
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
        getTitle:        function () {
            return this.definition.title;
        },
        getColumns:      function () {
            return this.definition.columns;
        },
        getPagination:   function () {
            return {
                show_first_last: this.dtable.pagination.getShowFirstLast(),
                pages:           this.dtable.pagination.getPageNum(),
                rows_per_page:   this.dtable.pagination.getRowsPerPage()
            };
        },
        getSearch:       function () {
            return {
                placeholder: this.dtable.search.options.placeholder
            };
        },
        hasColumnFilter: function () {
            return this.definition.has_column_filter;
        },
        hasColumnTitle: function() {
            return this.definition.has_column_title;
        },
        loading:         function (callback) {
            var url = this.options.url;
            var obj = this;

            function success(data) {
                obj.definition = data;
                obj.isLoaded = true;
                obj.dtable.logger.info("json_url.definition: resource is loaded");

                obj.definition.has_column_filter = false;
                obj.definition.has_column_title = false;

                $.each(obj.getColumns(), function (key, value) {
                    if (value.filter) {
                        obj.definition.has_column_filter = true;
                    }

                    if (value.title)
                    {
                        obj.definition.has_column_title = true;
                    }
                });

                callback();
            }

            var type = "POST";
            if (this.options.method == "get") {
                type = "GET";
            }

            $.ajax(url, {
                url:      url,
                type:     type,
                async:    true,
                cache:    this.options.timestamp,
                data:     this.options.data,
                dataType: "json",
                error:    function () {
                    obj.dtable.logger.error("Can't load definition resource from " + url);
                },
                success:  success
            });
        }
    });

}(DTableModule, jQuery));
