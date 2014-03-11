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

    DTableModule.newModule(DTableModule.MODULE_FORMATTER, "advanced", {
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

            options = $.extend(true, {}, this.options, options);

            return this
                .getWidget(options.widget)
                .format(value, options.widget_options);
        }
    });

}(DTableModule, jQuery));