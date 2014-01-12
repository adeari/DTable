/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
 */

(function ($, DTableModule) {

    function DTable(table, options) {
        var defaults = {
            definition: {
                name:    "json_url",
                options: {}
            },
            template:   {
                name:    "nunjucks",
                options: {}
            },
            logger:     {
                name:    "default",
                options: {}
            },
            source: {
                name: "json_url",
                options: {}
            }
        };

        this.table = table;
        this.options = $.extend({}, defaults, options);

        this.definition = DTableModule.getModule(DTableModule.MODULE_DEFINITION, this.options.definition.name, this.options.definition.options, this);
        this.template = DTableModule.getModule(DTableModule.MODULE_TEMPLATE, this.options.template.name, this.options.template.options, this);
        this.logger = DTableModule.getModule(DTableModule.MODULE_LOGGER, this.options.logger.name, this.options.logger.options, this);
        this.source = DTableModule.getModule(DTableModule.MODULE_SOURCE, this.options.source.name, this.options.source.options, this);

        this.loading();
    }

    DTable.prototype.loading = function () {
        var obj = this;

        function allLoaded() {
            if (obj.definition.isLoaded && obj.template.isLoaded && obj.source.isLoaded) {
                obj.logger.info("DTable.loading: resources loaded");
            }
        }

        this.logger.info("DTable.loading: start loading resources");

        this.definition.loading(allLoaded);
        this.template.loading(allLoaded);
        this.source.loading(allLoaded);
    };

    $.fn.dtable = function (options) {

        var dtable;

        if (!this.data("DTable")) {
            dtable = new DTable(this, options);
            this.data("DTable", dtable);
        }
        else {
            dtable = this.data("DTable");
        }

        return dtable;
    };

}(jQuery, DTableModule));
