/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
 */
(function (DTableModule, $) {

    DTableModule.newModule(DTableModule.MODULE_DEFINITION, "json_url", {
        init:          function (options, dtable) {
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
            return this.definition.pagination;
        },
        search:        function () {
            return this.definition.search;
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
                callback(data);
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
