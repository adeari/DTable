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

    var _modules = false;

    var DTableModule = IFace.extend({
        init: function () {
            this.MODULE_TEMPLATE = 'template';
            this.MODULE_DEFINITION = 'definition';
            this.MODULE_LOGGER = 'logger';
            this.MODULE_SOURCE = 'source';
            this.MODULE_SEARCH = 'search';
            this.MODULE_PAGINATION = 'pagination';
            this.MODULE_LOADING = 'loading';
            this.MODULE_ORDER = 'order';
            this.MODULE_FORMATTER = 'formatter';
            this.MODULE_CORE = 'core';
            this.MODULE_FORMATTER_WIDGET = 'formatter_widget';
        },
        initModules: function(){
            if (_modules == false)
            {
                _modules = {};

                $.each(IFace.getIFaceNames(), function(key, name){
                    _modules[name] = {};
                });
            }
        },
        check: function(type)
        {
            if (!IFace.isExist(type)) {
                throw "Invalid DTableModule type";
            }
        },
        isExist: function(type, name)
        {
            this.initModules();

            if (_modules[type] == undefined || _modules[type][name] == undefined)
            {
                return false;
            }
            else
            {
                return true;
            }
        },
        getModule: function (type, name, options, dtable) {

            this.initModules();

            this.check(type);

            if (!this.isExist(type, name))
            {
                throw "DTableModule '" + name + "' doesn't exist.";
            }

            return new _modules[type][name](options, dtable);
        },
        newModule: function (type, name, props) {

            this.initModules();

            this.check(type);

            if (this.isExist(type, name))
            {
                throw "DTableModule " + name + " already exist.";
            }

            _modules[type][name] = IFace.get(type).extend(props);
        },
        extendModule: function (type, extend, newName, props) {

            this.initModules();

            this.check(type);

            if (!this.isExist(type, name))
            {
                throw "DTableModule '" + name + "' doesn't exist.";
            }

            if (this.isExist(type, name)) {
                throw "DTableModule " + newName + " already exist.";
            }

            _modules[type][newName] = _modules[type][extend].extend(props);
        }
    });

    return new DTableModule();

}(DTableInterfaces, jQuery));
