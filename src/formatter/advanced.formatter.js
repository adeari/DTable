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
        init: function (options, dtable) {

            var defaults = {
                widget: "string",
                widget_options: {
                    escape: true
                }
            };

            this.dtable = dtable;
            this.options = $.extend(true, {}, defaults, options);

            this.widgets = false;

            this.buildWidgetSchema();
        },
        buildWidgetSchema: function () {

            if (this.widgets == false) {

                this.widgets = {};

                var obj = this;
                var columns = this.dtable.definition.getColumns();

                $.each(columns, function (columnId, options) {

                    var formatterOpt = obj.options;

                    if (options.hasOwnProperty("formatter") && options.formatter) {
                        formatterOpt = $.extend(true, {widget_options: {column_id: columnId}}, obj.options, options.formatter);
                    }

                    obj.setWidget(columnId, formatterOpt);
                });
            }
        },
        setWidget: function (columnId, options) {
            this.widgets[columnId] = DTableModule.getModule(DTableModule.MODULE_FORMATTER_WIDGET, options.widget, options.widget_options, this.dtable);
        },
        getWidget: function (columnId) {
            if (this.widgets[columnId] == undefined) {
                throw "widget does not exist for " + columnId;
            }

            return this.widgets[columnId];
        },
        format: function (columnId, value, values) {

            var widget = this.getWidget(columnId);

            return widget.format(columnId, value, values);
        }

    });

}(DTableModule, jQuery));
