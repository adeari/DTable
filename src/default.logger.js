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
(function (DTableModule) {

    DTableModule.newModule(DTableModule.MODULE_LOGGER, "default", {
        init:  function (options, dtable) {
            var defaults = {
                debug: false
            };

            this.dtable = dtable;
            this.options = $.extend({}, defaults, options);
        },
        error: function (msg) {
            this.dtable.loading.stopLoading();

            this.dtable.table.html("Error.");

            throw msg;
        },
        info:  function (msg) {
            if (this.options.debug) {
                console.log(msg);
            }
        }
    });

}(DTableModule));