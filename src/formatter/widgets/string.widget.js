(function (DTableModule, $) {

    DTableModule.newModule(DTableModule.MODULE_FORMATTER_WIDGET, "string", {
        entityMap: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        },
        escapeHTML: function(string)
        {
            var obj = this;

            return String(string).replace(/[&<>"'\/]/g, function (s) {
                return obj.entityMap[s];
            });
        },
        defOptions: function(){
            return {
                escape: true
            };
        },
        format: function (value, options) {

            options = this.getOptions(options);

            if (options.escape)
            {
                return this.escapeHTML(value);
            }
            else
            {
                return value;
            }
        }
    });

}(DTableModule, jQuery));