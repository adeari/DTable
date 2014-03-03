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
var DTableModule = (function (IFace, $) {
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
        getIsLoaded: function () {
            return this.isLoaded;
        },
        loading: function (callback) {
        }
    });

    var _interfaces = {};

    _interfaces[MODULE_DEFINITION] = IFace.get('definition');

    _interfaces[MODULE_TEMPLATE] = IFace.get('template');

    _interfaces[MODULE_LOGGER] = IFace.get('logger');

    _interfaces[MODULE_SOURCE] = IFace.get('source');

    _interfaces[MODULE_SEARCH] = IFace.get('search');

    _interfaces[MODULE_PAGINATION] = IFace.get('pagination');

    _interfaces[MODULE_LOADING] = IFace.get('loading');

    _interfaces[MODULE_ORDER] = IFace.get('order');

    _interfaces[MODULE_FORMATTER] = IFace.get('formatter');

    _interfaces[MODULE_CORE] = IFace.get('core');

    var _modules = [];

    var DTableModule = Class.extend({
        init: function () {
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

            $.each(_interfaces, function (key) {
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
        extendModule: function (type, extend, newName, props) {
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

}(DTableInterfaces, jQuery));
