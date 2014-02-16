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
(function(DTableModule, $){

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

}(DTableModule, jQuery));