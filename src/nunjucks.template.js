/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
 */

(function (DTableModule, nunjucks) {

    DTableModule.newModule(DTableModule.MODULE_TEMPLATE, "nunjucks", {
        init:    function (options, dtable) {
            this.isLoaded = false;

            var defaults = {
                view_dir:            "/js/dtable/views",
                table_template:      "pagination.html",
                rows_template:       "rows.html",
                pagination_template: "table.html"
            };

            this.dtable = dtable;
            this.options = $.extend({}, defaults, options);
            this.template = {
                table:      false,
                rows:       false,
                pagination: false
            };

            this.env = new nunjucks.Environment(new nunjucks.WebLoader(this.options.view_dir));
        },
        loading: function (callback) {

            var obj = this;

            function allLoaded(callback) {
                if (obj.template.table && obj.template.rows && obj.template.pagination) {
                    obj.isLoaded = true;

                    callback();
                }
            }

            this.env.getTemplate(this.options.table_template, function (err, tmpl) {
                if (err) {
                    obj.dtable.logger.error(err);
                }
                else {
                    obj.dtable.logger.info("nunjucks.template.loading: " + obj.options.table_template + " is loaded");
                    obj.template.table = tmpl;
                    allLoaded(callback);
                }
            });

            this.env.getTemplate(this.options.rows_template, function (err, tmpl) {
                if (err) {
                    obj.dtable.logger.error(err);
                }
                else {
                    obj.dtable.logger.info("nunjucks.template.loading: " + obj.options.rows_template + " is loaded");
                    obj.template.rows = tmpl;
                    allLoaded(callback);
                }
            });

            this.env.getTemplate(this.options.pagination_template, function (err, tmpl) {
                if (err) {
                    obj.dtable.logger.error(err);
                }
                else {
                    obj.dtable.logger.info("nunjucks.template.loading: " + obj.options.pagination_template + " is loaded");
                    obj.template.pagination = tmpl;
                    allLoaded(callback);
                }
            });
        }
    });

}(DTableModule, nunjucks));