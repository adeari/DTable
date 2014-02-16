/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
 */

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
