(function(IFace, DTableModule, $){

    IFace.add('formatter', {
        init: function(options, dtable) {
            var defaults = this.getDefaults();
            this.options = $.extend(true, defaults, options);
            this.dtable = dtable;
            this.widgets = {};
            this.formatterOptionsCache = undefined;
        },
        getDefaults: function(){
            return {};
        },
        updateFormatterOptionCache: function () {

            this.formatterOptionsCache = {};

            var columns = this.dtable.definition.getColumns();
            for (var key in columns) {
                if (columns.hasOwnProperty(key) && columns[key]['formatter'] != undefined) {
                    this.formatterOptionsCache[key] = columns[key]['formatter'];
                }
            }
        },
        getFormatterOption: function(columnId)
        {
            if (this.formatterOptionsCache == undefined)
            {
                this.updateFormatterOptionCache();
            }

            var options = {};

            if (this.formatterOptionsCache[columnId] != undefined)
            {
                options = this.formatterOptionsCache[columnId];
            }

            return options;
        },
        getWidget: function(name, options)
        {
            if (!this.widgets.hasOwnProperty(name))
            {
                if (options == undefined)
                {
                    options = {};
                }

                this.widgets[name] = DTableModule.getModule(DTableModule.MODULE_FORMATTER_WIDGET, name, options, this.dtable);
            }

            return this.widgets[name];
        },
        format: function (columnId, value) {
            return value;
        }
    });


}(DTableInterfaces, DTableModule, jQuery));