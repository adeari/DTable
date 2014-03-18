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
        init: function(options, dtable){

            var defaults = {
                widget: 'string',
                widget_options: {
                    escape: true
                }
            };

            this.options = $.extend(true, {}, defaults, options);
            this.dtable = dtable;

            this.widget = false;
        },
        initWidget: function(){
            if (this.widget == false)
            {
                this.widget = DTableModule.getModule(DTableModule.MODULE_FORMATTER_WIDGET, this.options.widget, this.options.widget_options, this.dtable);
            }
        },
        format: function (columnId, value, values) {

            this.initWidget();

            return this.widget
                .format(columnId, value, values);
        }
    });

}(DTableModule, jQuery));
