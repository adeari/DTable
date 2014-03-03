(function(IFace){

    IFace.add('core', {
        init: function(options, dtable) {
            this.table = dtable;
            var defaults = {
                definition: {
                    name: "json_url",
                    options: {}
                },
                template: {
                    name: "nunjucks",
                    options: {}
                },
                logger: {
                    name: "default",
                    options: {}
                },
                source: {
                    name: "json_url",
                    options: {}
                },
                search: {
                    name: "default",
                    options: {}
                },
                pagination: {
                    name: "default",
                    options: {}
                },
                loading: {
                    name: "default",
                    options: {}
                },
                order: {
                    name: "default",
                    options: {}
                },
                formatter: {
                    name: false,
                    options: {}
                }
            };

            this.options = $.extend(true, {}, defaults, options);

            this.configure();
        },
        /**
         * Update table imediately, use search module update to queue
         */
        update: function () {
        }
    });


}(DTableInterfaces));