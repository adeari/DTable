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
        getDefaults: function(){
            return {
                widget: 'string',
                widget_options: {
                    escape: true
                }
            };
        },
        format: function(columnId, value) {

            return this
                .getWidget(this.options.widget)
                .format(value, this.options.widget_options);
        }
    });

}(DTableModule, jQuery));