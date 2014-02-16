/*! DTable - v0.5.0 - 2014-02-16
* https://github.com/kubanka-peter/dtable
* Copyright (c) 2014 Kubi; Licensed MIT */
var DTableModule = (function ($) {
    /* Simple JavaScript Inheritance
     * By John Resig http://ejohn.org/
     * http://ejohn.org/blog/simple-javascript-inheritance/
     * MIT Licensed.
     */
    // Inspired by base2 and Prototype
    var Class = (function () {
        var initializing = false, fnTest = /xyz/.test(function () {
            xyz;
        }) ? /\b_super\b/ : /.*/;

        // The base Class implementation (does nothing)
        var Class = function () {
        };

        // Create a new Class that inherits from this class
        Class.extend = function (prop) {
            var _super = this.prototype;

            // Instantiate a base class (but only create the instance,
            // don't run the init constructor)
            initializing = true;
            var prototype = new this();
            initializing = false;

            // Copy the properties over onto the new prototype
            for (var name in prop) {
                // Check if we're overwriting an existing function
                prototype[name] = typeof prop[name] == "function" &&
                    typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                    (function (name, fn) {
                        return function () {
                            var tmp = this._super;

                            // Add a new ._super() method that is the same method
                            // but on the super-class
                            this._super = _super[name];

                            // The method only need to be bound temporarily, so we
                            // remove it when we're done executing
                            var ret = fn.apply(this, arguments);
                            this._super = tmp;

                            return ret;
                        };
                    })(name, prop[name]) :
                    prop[name];
            }

            // The dummy class constructor
            function Class() {
                // All construction is actually done in the init method
                if (!initializing && this.init) {
                    this.init.apply(this, arguments);
                }
            }

            // Populate our constructed prototype object
            Class.prototype = prototype;

            // Enforce the constructor to be what we expect
            Class.prototype.constructor = Class;

            // And make this class extendable
            Class.extend = arguments.callee;

            return Class;
        };

        return Class;
    })();

    var MODULE_TEMPLATE = 0;
    var MODULE_DEFINITION = 1;
    var MODULE_LOGGER = 2;
    var MODULE_SOURCE = 3;
    var MODULE_SEARCH = 4;
    var MODULE_PAGINATION = 5;
    var MODULE_LOADING = 6;
    var MODULE_ORDER = 7;
    var MODULE_FORMATTER = 8;
    var MODULE_CORE = 9;

    /**
     * Base object to load resource
     *
     * @type {*|extend}
     */
    var ResourceLoader = Class.extend({
        isLoaded: false,
        init:     function (options, dtable) {},
        loading:  function (callback) {}
    });

    var _interfaces = {};

    /**
     * Table definition interface
     *
     * @type {*}
     */
    _interfaces[MODULE_DEFINITION] = ResourceLoader.extend({
        /**
         * get the table title
         *
         * @returns {string}
         */
        getTitle:      function () {
        },
        /**
         * get the columns definition,
         * must return the following format
         *
         * {
         *   <column_id> : {
         *     title: <title||flase>,                                       # column title, if false no column title will shown and order and html attr will not work
         *     filter: <false||{placeholder: <placeholder_text>}>,          # enable filter for column, placeholder shown in the input field
         *     order:  <false||true||"desc"||"asc">,                        # enable order for column, if "desc" or "asc" the column will be ordered
         *     html_tag_attr: <false || {                                             # html attributes, can be false
         *       <attr_name_1>: <attr_value_1},                             # style: "color: #f00" => <td style="color: #f00">{{ column_title }}</td>
         *       <attr_name_2>: <attr_value_3},
         *       ...
         *     }>
         *   }
         * }
         *
         *
         *
         * @returns {{}}
         */
        getColumns:    function () {
        },
        /**
         *  get the pagination definition
         *  must return the following format or false:
         *
         *  {
         *      show_first_last: <true|false>,      # show first and last page
         *      pages: <int>,                       # how many page shown in the pager, odd number
         *      rows_per_page: <int>                # number of rows in a page
         *  }
         *
         *  if false returned, no pagination used
         *
         * @returns {{}}||false
         */
        getPagination: function () {
        },
        /**
         * get the global search definition
         * must return the following format or false:
         *
         * {
         *      placeholder: <string>               # search input field placeholder text
         *      submit: <string>                    # submit button text
         * }
         *
         * @returns {{}}
         */
        getSearch:        function () {
        },
        /**
         * return true if one of the column deff has filter enabled
         */
        hasColumnFilter: function(){},
        /**
         * return true if one of the column has title
         */
        hasColumnTitle: function(){}

    });

    /**
     * Template interface
     *
     * @type {*}
     */
    _interfaces[MODULE_TEMPLATE] = ResourceLoader.extend({
        /**
         * Return the rendered table html
         * @param params
         */
        getTableHtml:      function (params) {},
        /**
         * Retrun the rendered rows html
         * @param params
         */
        getRowsHtml:       function (params) {},
        /**
         * Return the rendered pagination html
         * @param params
         */
        getPaginationHtml: function (params) {}
    });

    /**
     * Logger interface
     *
     * @type {*|extend}
     */
    _interfaces[MODULE_LOGGER] = Class.extend({
        /**
         * Log error also throw exception and stop loading
         *
         * @param msg
         */
        error: function (msg) { },
        /**
         * Log info
         * @param msg
         */
        info:  function (msg) { }
    });

    /**
     * Source interface, used to get table rows
     *
     * @type {*}
     */
    _interfaces[MODULE_SOURCE] = ResourceLoader.extend({
        /**
         * must return the following format:
         *
         * [{
         *   <column_id> : <data>,
         *   ...
         * }, ... ]
         */
        getRows: function(){},
        getCount: function(){}
    });

    /**
     * Search interface, used to build query params to post
     * and update the table
     *
     * @type {*|extend}
     */
    _interfaces[MODULE_SEARCH] = Class.extend({
        /**
         * call it when a search parameter changed, it will call dtable.update
         */
        update: function() {},
        /**
         * get the query params to post
         */
        getParams: function(){}
    });

    /**
     * Pagination interface, used to controll pagination
     * @type {*|extend}
     */
    _interfaces[MODULE_PAGINATION] = Class.extend({
        /**
         * current page
         * @return int
         */
        getPage: function(){},
        /**
         * set current page
         * @param page
         */
        setPage: function(page){},
        /**
         * have to show first and last page?
         */
        getShowFirstLast: function(){},
        /**
         * number of pages to show in pagination, odd number!
         */
        getPageNum: function(){},
        /**
         * get rows per page
         */
        getRowsPerPage: function(){},
        /**
         * set rows per page
         * @param page
         */
        setRowsPerPage: function(page){},
        /**
         * max page num
         */
        getMaxPage: function(){},
        /**
         * array contains pages to show in pagination
         */
        getPagesArr: function(){},
        /**
         * offset to post in query
         */
        getOffset: function(){}
    });

    /**
     * Loading indicator interface
     *
     * @type {*|extend}
     */
    _interfaces[MODULE_LOADING] = Class.extend({
        startLoading: function(){},
        stopLoading: function(){}
    });

    /**
     * Order controll interface
     *
     * @type {*|extend}
     */
    _interfaces[MODULE_ORDER] = Class.extend({
        getOrderBy: function(){}
    });

    /**
     * Formatter module, used to format a cell
     *
     * @type {*|extend}
     */
    _interfaces[MODULE_FORMATTER] = Class.extend({
        format: function(columnId, value) {}
    });

    _interfaces[MODULE_CORE] = Class.extend({});

    var _modules = [];

    var DTableModule = Class.extend({
        init:      function () {
            this.MODULE_TEMPLATE = MODULE_TEMPLATE;
            this.MODULE_DEFINITION = MODULE_DEFINITION;
            this.MODULE_LOGGER = MODULE_LOGGER;
            this.MODULE_SOURCE = MODULE_SOURCE;
            this.MODULE_SEARCH = MODULE_SEARCH;
            this.MODULE_PAGINATION = MODULE_PAGINATION;
            this.MODULE_LOADING = MODULE_LOADING;
            this.MODULE_ORDER = MODULE_ORDER;
            this.MODULE_FORMATTER = MODULE_FORMATTER;
            this.MODULE_CORE = MODULE_CORE;

            $.each(_interfaces, function(key){
                _modules[key] = {};
            });
        },
        getModule: function (type, name, options, dtable) {
            if (_modules[type] == undefined) {
                throw "Invalid DTableModule type";
            }

            if (_modules[type][name] == undefined) {
                throw "DTableModule '" + name + "' doesn't exist.";
            }

            return new _modules[type][name](options, dtable);
        },
        newModule: function (type, name, props) {
            if (_modules[type] == undefined) {
                throw "Invalid DTableModule type";
            }

            if (_modules[type][name] != undefined) {
                throw "DTableModule " + name + " already exist.";
            }

            _modules[type][name] = _interfaces[type].extend(props);
        },
        extendModule: function(type, extend, newName, props)
        {
            if (_modules[type] == undefined) {
                throw "Invalid DTableModule type";
            }

            if (_modules[type][extend] == undefined) {
                throw "DTableModule '" + name + "' doesn't exist.";
            }

            if (_modules[type][newName] != undefined) {
                throw "DTableModule " + newName + " already exist.";
            }

            _modules[type][newName] = _modules[type][extend].extend(props);
        }
    });

    return new DTableModule();

}(jQuery));
;(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_FORMATTER, "simple", {
        init: function(options, dtable) {

            var defaults = {};
            this.options = $.extend({}, defaults, options);

            this.dtable = dtable;

            this.entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };
        },
        escapeHTML: function(string)
        {
            var obj = this;

            return String(string).replace(/[&<>"'\/]/g, function (s) {
                return obj.entityMap[s];
            });
        },
        format: function(columnId, value) {
            //return value;
            return this.escapeHTML(value);
        }
    });

}(DTableModule, jQuery));;(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_LOADING, "default", {
        init: function(options, dtable){

            this.dtable = dtable;

            this.div = false;
            this.enabled = false;
            this.is_loading = false;

            var div = dtable.table.find('[data-dtable="loading"]');

            if (div.length)
            {
                this.enabled = true;

                this.div = div;
            }

        },
        startLoading: function(){

            var obj = this;
            this.dtable.table.trigger("dtable.start_loading");

            if (!this.is_loading && this.enabled)
            {
                this.is_loading = true;

                setTimeout(function(){

                    if (obj.is_loading)
                    {
                        obj.dtable.table.find('[data-dtable="loading-container"]').html(obj.div);
                    }

                }, 300)
            }
        },
        stopLoading: function(){

            this.dtable.table.trigger("dtable.stop_loading");

            if (this.enabled)
            {
                this.is_loading = false;
                var div = this.dtable.table.find('[data-dtable="loading"]');

                if (div.length)
                {
                    div.remove();
                }
            }
        }
    });

}(DTableModule, jQuery));;(function (DTableModule) {

    DTableModule.newModule(DTableModule.MODULE_LOGGER, "default", {
        init:  function (options, dtable) {
            var defaults = {
                debug: false
            };

            this.dtable = dtable;
            this.options = $.extend({}, defaults, options);
        },
        error: function (msg) {
            this.dtable.loading.stopLoading();

            this.dtable.table.html("Error.");

            throw msg;
        },
        info:  function (msg) {
            if (this.options.debug) {
                console.log(msg);
            }
        }
    });

}(DTableModule));;(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_ORDER, 'default', {
        init: function(options, dtable) {

            var defaults = {};

            this.options = $.extend({}, defaults, options);
            this.dtable = dtable;

            this.columns = "";

            var obj = this;

            this.dtable.table.on("click", '[data-dtable="order.asc"]', function(){
                obj.setOrder($(this), 'asc');

                return false;
            })
            this.dtable.table.on("click", '[data-dtable="order.desc"]', function(){
                obj.setOrder($(this), 'desc');

                return false;
            })
        },
        setOrder: function(link, order){
            this.dtable.table.find('[data-dtable="order.asc"]').removeClass("active");
            this.dtable.table.find('[data-dtable="order.desc"]').removeClass("active");

            link.addClass("active");
            this.columns = {};
            this.columns[link.attr("data-dtable-column")] = order;

            this.dtable.update();
        },
        getOrderBy: function() {
            return this.columns;
        }
    });

}(DTableModule, jQuery));;(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_PAGINATION, "default", {
        init: function(options, dtable){
            var defaults = {
                show_first_and_last: true,
                pages: 5,
                rows_per_page: 20
            };

            this.page = 1;
            this.dtable = dtable;
            this.options = $.extend({}, defaults, options);

            var obj = this;

            dtable.table.on("click", '[data-dtable="page"]', function(){
                var link = $(this);
                var page = link.attr("data-page");

                obj.setPage(page);

                obj.dtable.update();

                return false;
            });

        },
        // current page
        getPage: function(){
            return this.page;
        },
        setPage: function(page){
            this.page = parseInt(page);
        },
        // pagination first and last page show?
        getShowFirstLast: function(){
            return this.options.show_first_and_last;
        },
        // pagination, shown pages
        getPageNum: function(){
            return this.options.pages;
        },
        // number of results per page
        getRowsPerPage: function(){
            return this.options.rows_per_page;
        },
        setRowsPerPage: function(rows){
            this.options.rows_per_page = rows;
        },
        getMaxPage: function(){
            return Math.ceil(this.dtable.source.getCount() / this.dtable.definition.getPagination().rows_per_page);
        },
        getOffset: function(){
            return (this.page * this.options.rows_per_page) - this.options.rows_per_page;
        },
        getPagesArr: function(){
            var maxPage = this.getMaxPage();
            var minPage = 1;

            var offset = Math.round((this.dtable.definition.getPagination().pages - 1) / 2);
            var start = this.getPage() - offset;
            var end = this.getPage() + offset;

            start = Math.max(minPage, start);
            end = Math.min(maxPage, end);

            if (end < this.dtable.definition.getPagination().pages)
            {
                end = Math.min(this.dtable.definition.getPagination().pages, maxPage);
            }

            if ((end - start) < this.dtable.definition.getPagination().pages)
            {
                start = end - this.dtable.definition.getPagination().pages + 1;
                if (start < minPage)
                {
                    start = minPage;
                }
            }

            var pages = false;

            if (start != end)
            {
                pages = [];

                for (var i = start; i <= end; i++)
                {
                    pages.push(i);
                }
            }

            return pages;
        }
    });

}(DTableModule, jQuery));;(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_SEARCH, "default", {
        init: function(options, dtable){

            var defaults = {
                placeholder: "search ...",
                waiting: 600
            };

            this.search = "";

            this.filter = "";

            this.in_progress = false;
            this.update_after = false;

            this.options = $.extend({}, defaults, options);
            this.dtable = dtable;

            var obj = this;

            this.dtable.table.on("keyup", '[data-dtable="search"]', function(){
                obj.search = $(this).val();
                obj.dtable.pagination.setPage(1);
                obj.update();
            });

            this.dtable.table.on("keyup", '[data-dtable="filter"]', function(){
                var elem = $(this);

                if (obj.filter === "")
                {
                    obj.filter = {};
                }
                obj.filter[elem.attr('data-column')] = elem.val();
                obj.dtable.pagination.setPage(1);
                obj.update();
            });
        },
        update: function()
        {
            var waiting = parseInt(this.options.waiting);
            this.update_after = new Date().getTime() + waiting;

            if (!this.in_progress)
            {
                this.in_progress = true;

                var obj = this;

                var wait = function(){
                    if (new Date().getTime() >= obj.update_after)
                    {
                        obj.in_progress = false;
                        obj.dtable.update();
                    }
                    else
                    {
                        setTimeout(wait, waiting / 2);
                    }
                }

                setTimeout(wait, waiting / 2);
            }
        },
        getParams: function(){
            var params = {
                search: this.search,
                filter: this.filter,
                per_page: this.dtable.definition.getPagination().rows_per_page,
                offset: this.dtable.pagination.getOffset(),
                order: this.dtable.order.getOrderBy()
            };

            return params;
        }
    });

}(DTableModule, jQuery));;(function ($, DTableModule) {

    $.fn.dtable = function (options, core) {

        var dtable;

        if (!this.data("dtable"))
        {
            core = core || "firefly";
            dtable = DTableModule.getModule(DTableModule.MODULE_CORE, core, options, this);
        }
        else
        {
            dtable = this.data("dtable");
        }

        return dtable;
    };

}(jQuery, DTableModule));
;(function (DTableModule, $) {

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

}(DTableModule, jQuery));;(function (DTableModule, $) {

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

                callback.call(obj.dtable);
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
;(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_SOURCE, "json_url", {
        init: function(options, dtable){
            var defaults = {
                url: "",
                method: "post"
            };

            this.data = null;
            this.isLoaded = false;
            this.options = $.extend({}, defaults, options);
            this.dtable = dtable;
        },
        loading:  function (callback) {

            var url = this.options.url;
            var obj = this;

            function success(data) {

                if (!('count' in data ) || !('rows' in data))
                {
                    obj.dtable.logger.error("Invalid source response");
                }

                obj.data = data;
                obj.isLoaded = true;
                callback.call(obj.dtable);
            }

            function error() {
                obj.dtable.logger.error("Can't load source resource from " + url);
            }

            if (this.options.method == "get") {
                $.get(url, obj.dtable.search.getParams(), success, "json").error(error);
            } else {
                $.post(url, obj.dtable.search.getParams(), success, "json").error(error);
            }
        },
        getRows: function(){
            return this.data.rows;
        },
        getCount: function(){
            return this.data.count;
        }
    });

}(DTableModule, jQuery));;(function (DTableModule, nunjucks) {

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

                    callback.call(obj.dtable);
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
        },
        getTableHtml: function(params)
        {
            return this.template.table.render(params);
        },
        getRowsHtml: function(params)
        {
            return this.template.rows.render(params);
        },
        getPaginationHtml: function(params)
        {
            return this.template.pagination.render(params);
        }
    });

}(DTableModule, nunjucks));
