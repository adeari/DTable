/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
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
            throw msg;
        },
        info:  function (msg) {
            if (this.options.debug) {
                console.log(msg);
            }
        }
    });

}(DTableModule));