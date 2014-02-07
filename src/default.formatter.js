(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_FORMATTER, "default", {
        init: function(options, dtable) {

            var defaults = {};
            this.options = $.extend({}, defaults, options);

            this.dtable = dtable;
        },
        format: function(columnId, value) {
            return value;
        }
    });

}(DTableModule, jQuery));
