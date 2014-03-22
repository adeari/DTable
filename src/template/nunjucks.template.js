/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 *
 * Contributors: Kubi
 *
 * Created by Kubi; Licensed MIT
 */
(function (DTableModule, nunjucks) {

    DTableModule.newModule(DTableModule.MODULE_TEMPLATE, "nunjucks", {
        init:    function (options, dtable) {
            this.isLoaded = false;

            var defaults = {
                view_dir:            "/views",
                table_template:      "table.html",
                rows_template:       "rows.html",
                pagination_template: "pagination.html"
            };

            this.dtable = dtable;
            this.options = $.extend({}, defaults, options);

            this.templates = {};

            this.addTemplate('table', this.options.table_template);
            this.addTemplate('rows', this.options.rows_template);
            this.addTemplate('pagination', this.options.pagination_template);

            this.env = new nunjucks.Environment(new nunjucks.WebLoader(this.options.view_dir));
        },
        addTemplate: function(templateName, templateFile)
        {
            if (this.templates[templateName] != undefined)
            {
                throw "template " + templateName + " is sexist";
            }

            this.templates[templateName] = {
                file: templateFile,
                template: false
            };
        },
        /**
         * return false if the template is not loaded
         *
         * @param templateName
         */
        getTemplate: function(templateName) {

            if (this.templates[templateName] == undefined)
            {
                throw "template " + templateName + " is'nt exist.";
            }

            return this.templates[templateName].template;
        },
        loading: function (callback) {

            var obj = this;

            var checkLoaded = function(){
                var ok = true;
                $.each(obj.templates, function(templateName, options){
                    if (!options.template)
                    {
                        ok = false;
                    }
                });

                if (ok)
                {
                    obj.isLoaded = true;
                    obj.dtable.logger.info("nunjucks.template.js: all loaded");
                    callback.call(obj.dtable);
                }
            };

            $.each(this.templates, function(templateName, options){
                if (!options.template)
                {
                    obj.env.getTemplate(options.file, function(err, tmpl){
                        if (err)
                        {
                            obj.dtable.logger.error(err);
                        }
                        else
                        {
                            obj.templates[templateName].template = tmpl;
                            obj.dtable.logger.info("nunjucks.template.js: " + templateName + " is loaded");
                            checkLoaded();
                        }
                    });
                }

            });
        },
        getHtml: function(template, params)
        {
            return this.getTemplate(template).render(params);
        },
        getTableHtml: function(params)
        {
            return this.getHtml("table", params);
        },
        getRowsHtml: function(params)
        {
            return this.getHtml("rows", params);
        },
        getPaginationHtml: function(params)
        {
            return this.getHtml("pagination", params);
        }
    });

}(DTableModule, nunjucks));
