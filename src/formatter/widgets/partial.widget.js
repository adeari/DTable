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

    DTableModule.newModule(DTableModule.MODULE_FORMATTER_WIDGET, "partial", {
        init: function (options, dtable) {
            this._super(options, dtable);

            if (this.options.template == undefined || this.options.template == false)
            {
                throw "partial widget requires template option";
            }

            this.templateName = "partial_" + this.options.column_id;
            this.dtable.template.addTemplate(this.templateName, this.options.template);
        },
        getDefaults: function () {
            return {
                template: false
            };
        },
        format: function (columnId, value, values) {

            return this.dtable.template.getHtml(this.templateName, {
                value: value,
                column_id: columnId,
                values: values
            });
        }
    });

}(DTableModule, jQuery));
