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
            },
            search: {
                name: "default",
                options: {}
            }
        };

        this.table = table;
        this.options = $.extend({}, defaults, options);

        this.definition = DTableModule.getModule(DTableModule.MODULE_DEFINITION, this.options.definition.name, this.options.definition.options, this);
        this.template = DTableModule.getModule(DTableModule.MODULE_TEMPLATE, this.options.template.name, this.options.template.options, this);
        this.logger = DTableModule.getModule(DTableModule.MODULE_LOGGER, this.options.logger.name, this.options.logger.options, this);
        this.source = DTableModule.getModule(DTableModule.MODULE_SOURCE, this.options.source.name, this.options.source.options, this);
        this.search = DTableModule.getModule(DTableModule.MODULE_SEARCH, this.options.search.name, this.options.search.name, this);

        this.loading();
    }

    DTable.prototype.renderTable = function() {
        var html = this.template.getTableHtml({
            "title": this.definition.getTitle(),
            "pagination": this.definition.getPagination(),
            "search": this.definition.getSearch(),
            "columns": this.definition.getColumns(),
            "has_column_filter": this.definition.hasColumnFilter()
        });

        this.table.html(html);
    };

    DTable.prototype.renderRows = function() {
        var html = this.template.getRowsHtml({
            "rows": this.source.getRows(),
            "columns": this.definition.getColumns()
        });

        var table = this.table.find('[data-dtable="table"]');

        if (table.length)
        {
            table.html(html)
        }
        else
        {
            this.logger.error('Can\'t find rows root element [data-dtable="table"]');
        }
    };

    DTable.prototype.initSearch = function()
    {
        this.search.setPerPage(this.definition.getPagination().rows_per_page);
    }

    DTable.prototype.loading = function () {
        var obj = this;

        function loaded() {
            if (obj.definition.isLoaded && obj.template.isLoaded) {

                obj.initSearch();

                obj.source.loading(function(){
                    obj.logger.info("DTable.loading: resources loaded");

                    obj.renderTable();
                    obj.renderRows();
                });
            }
        }

        this.logger.info("DTable.loading: start loading resources");

        this.definition.loading(loaded);
        this.template.loading(loaded);
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
