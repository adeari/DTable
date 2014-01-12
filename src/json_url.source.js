/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
 */
(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_SOURCE, "json_url", {
        init: function(options, dtable){
            var defaults = {
                url: "",
                method: "post"
            };

            this.data = null;
            this.isLoaded = false;
            this.options = $.extend({}, defaults, options);
            this.dtable = dtable;
        },
        loading:  function (callback) {

            var url = this.options.url;
            var obj = this;

            function success(data) {
                obj.data = data;
                obj.isLoaded = true;
                obj.dtable.logger.info("json_url.source: resource is loaded");
                callback();
            }

            function error() {
                obj.dtable.logger.error("Can't load source resource from " + url);
            }

            if (this.options.method == "get") {
                $.get(url, {}, success, "json").error(error);
            } else {
                $.post(url, {}, success, "json").error(error);
            }
        },
        getRows: function(){
            return this.data;
        }
    });

}(DTableModule, jQuery));