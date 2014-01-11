/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
 */

var DTableModule = (function(){
    /* Simple JavaScript Inheritance
     * By John Resig http://ejohn.org/
     * http://ejohn.org/blog/simple-javascript-inheritance/
     * MIT Licensed.
     */
    // Inspired by base2 and Prototype
    var Class = (function(){
        var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

        // The base Class implementation (does nothing)
        var Class = function(){};

        // Create a new Class that inherits from this class
        Class.extend = function(prop) {
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
                    (function(name, fn){
                        return function() {
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
                if ( !initializing && this.init )
                    this.init.apply(this, arguments);
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

    /**
     * Base object skeleton to load resource
     *
     * @type {*|extend}
     */
    var ResourceLoader = Class.extend({
        init: function(options)
        {
            this.options = options;
            this.isLoaded = false;
        },
        isLoaded: function(){ return this.isLoaded },
        loading: function(callback){}
    });

    /**
     * Table definition skeleton
     *
     * @type {*}
     */
    var Definition = ResourceLoader.extend({
        /**
         * get the table title
         *
         * @returns {string}
         */
        getTitle: function()
        {
            return "title"
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
         * @returns {}
         */
        getColumns: function()
        {
            return {};
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
         * @returns {}||false
         */
        getPagination: function()
        {
            return false;
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
         * @returns {boolean}
         */
        search: function()
        {
            return false;
        }

    });

    /**
     * Template handler skeleton
     *
     * @type {*}
     */
    var Template = ResourceLoader.extend({
        getTableHtml: function(params)
        {
            return "none";
        },
        getRowsHtml: function(params)
        {
            return "none";
        },
        getPaginationHtml: function(params)
        {
            return "none";
        }
    });

    var _modules = [];

    var DTableModule =  Class.extend({
        init: function()
        {
            this.MODULE_TEMPLATE = 0;
            this.MODULE_DEFINITION = 1;

            _modules[this.MODULE_TEMPLATE] = {};
            _modules[this.MODULE_DEFINITION] = {};
        },
        getModule: function(type, name, options)
        {
            if (_modules[type] == undefined)
            {
                throw "Invalid DTableModule type";
            }

            if (_modules[type][name] == undefined)
            {
                throw "DTableModule '" + name + "' doesn't exist.";
            }

            return new _modules[type][name](options);
        },
        newModule: function(type, name, props)
        {
            if (_modules[type] == undefined)
            {
                throw "Invalid DTableModule type";
            }

            if (_modules[type][name] != undefined)
            {
                throw "DTableModule " + name + " already exist.";
            }

            switch (type)
            {
                case this.MODULE_TEMPLATE:
                    _modules[type][name] = Template.extend(props);
                    break;
                case this.MODULE_DEFINITION:
                    _modules[type][name] = Definition.extend(props);
                    break;
                default:
                    throw "Invalid DTableModule type";
            }

        }
    });

    return new DTableModule();

}());