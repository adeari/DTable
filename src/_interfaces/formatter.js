(function(IFace, DTableModule, $){

    IFace.add('formatter', {
        init: function(options, dtable) {
            var defaults = this.getDefaults();
            this.options = $.extend(true, defaults, options);
            this.dtable = dtable;
            this.widgets = {};
        },
        getDefaults: function(){
            return {};
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