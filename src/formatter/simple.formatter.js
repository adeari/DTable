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
(function (DTableModule, $) {

    DTableModule.newModule(DTableModule.MODULE_FORMATTER, "simple", {
        getDefaults: function () {
            return {
                widget: 'string',
                widget_options: {
                    escape: true
                }
            };
        },
        format: function (columnId, value) {

            var options = this.getFormatterOption(columnId);

            options = $.extend(true, {}, this.options.widget_options, options);

            return this
                .getWidget(this.options.widget)
                .format(value, options);
        }
    });

}(DTableModule, jQuery));