(function (DTableModule, $) {

    DTableModule.newModule(DTableModule.MODULE_CORE, "firefly", {
        /**
         * Initialize
         *
         * @param options
         * @param table
         */
        init: function (options, table) {
            var defaults = {
                definition: {
                    name: "json_url",
                    options: {}
                },
                template: {
                    name: "nunjucks",
                    options: {}
                },
                logger: {
                    name: "default",
                    options: {}
                },
                source: {
                    name: "json_url",
                    options: {}
                },
                search: {
                    name: "default",
                    options: {}
                },
                pagination: {
                    name: "default",
                    options: {}
                },
                loading: {
                    name: "default",
                    options: {}
                },
                order: {
                    name: "default",
                    options: {}
                },
                formatter: {
                    name: false,
                    options: {}
                }
            };

            // setting defaults
            this.table = table;
            this.options = $.extend(true, {}, defaults, options);

            // init modules
            this.definition = DTableModule.getModule(DTableModule.MODULE_DEFINITION, this.options.definition.name, this.options.definition.options, this);
            this.pagination = DTableModule.getModule(DTableModule.MODULE_PAGINATION, this.options.pagination.name, this.options.pagination.options, this);
            this.template = DTableModule.getModule(DTableModule.MODULE_TEMPLATE, this.options.template.name, this.options.template.options, this);
            this.logger = DTableModule.getModule(DTableModule.MODULE_LOGGER, this.options.logger.name, this.options.logger.options, this);
            this.source = DTableModule.getModule(DTableModule.MODULE_SOURCE, this.options.source.name, this.options.source.options, this);
            this.search = DTableModule.getModule(DTableModule.MODULE_SEARCH, this.options.search.name, this.options.search.name, this);
            this.loading = DTableModule.getModule(DTableModule.MODULE_LOADING, this.options.loading.name, this.options.loading.options, this);
            this.order = DTableModule.getModule(DTableModule.MODULE_ORDER, this.options.order.name, this.options.order.options, this);

            if (this.options.formatter.name) {
                this.formatter = DTableModule.getModule(DTableModule.MODULE_FORMATTER, this.options.formatter.name, this.options.formatter.options, this);
            }
            else {
                this.formatter = false;
            }

            this.loading.startLoading();

            this.definition.loading(this.loaded);
            this.template.loading(this.loaded);
        },
        /**
         * Everything is loaded? Then start rendering.
         */
        loaded: function () {
            if (this.definition.isLoaded && this.template.isLoaded) {
                this.renderTable();
                this.update();
            }
        },
        /**
         * Update table rows
         */
        update: function () {
            this.loading.startLoading();
            this.source.loading(this.sourceUpdated);
        },
        sourceUpdated: function () {
            this.loading.stopLoading();
            this.renderRows();
            this.renderPagination();

            this.table.trigger("dtable.updated");
        },
        /**
         * Render table
         */
        renderTable: function () {
            var html = this.template.getTableHtml({
                "title": this.definition.getTitle(),
                "pagination": this.definition.getPagination(),
                "search": this.definition.getSearch(),
                "columns": this.definition.getColumns(),
                "has_column_filter": this.definition.hasColumnFilter(),
                "has_column_title": this.definition.hasColumnTitle()
            });

            this.renderTableHtml(html);
        },
        /**
         * Render table html
         *
         * @param html
         */
        renderTableHtml: function (html) {
            this.table.html(html);
        },
        /**
         * Render rows
         */
        renderRows: function () {

            var rows = this.source.getRows();
            var formatter = this.formatter;

            if (formatter) {
                $.each(rows, function (rowIndex, row) {
                    $.each(row, function (colId, cell) {
                        rows[rowIndex][colId] = formatter.format(colId, cell);
                    });
                });
            }

            var html = this.template.getRowsHtml({
                "rows": rows,
                "columns": this.definition.getColumns()
            });

            this.renderRowsHtml(html);
        },
        /**
         * Render rows html
         */
        renderRowsHtml: function (html) {
            var table = this.table.find('[data-dtable="table"]');

            if (table.length) {
                table.html(html)
            }
            else {
                this.logger.error('Can\'t find rows root element [data-dtable="table"]');
            }
        },
        /**
         * Render pagination
         */
        renderPagination: function () {
            var html = "";

            var pages = this.pagination.getPagesArr();

            if (pages) {
                html = this.template.getPaginationHtml({
                    first: 1,
                    last: this.pagination.getMaxPage(),
                    pages: pages,
                    active: this.pagination.getPage(),
                    first_last: this.definition.getPagination().show_first_last
                });
            }

            this.renderPaginationHtml(html);
        },
        /**
         * Render pagination html
         */
        renderPaginationHtml: function (html) {
            var pagination = this.table.find('[data-dtable="pagination"]');

            if (pagination.length) {
                pagination.html(html);
            }
        }
    });

}(DTableModule, jQuery));