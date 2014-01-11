(function(DTableModule, $){

    var definition = {};

    DTableModule.newModule(DTableModule.MODULE_DEFINITION, "json_url", {
        init: function(options)
        {
            var defaults = {
                method: "get",
                url: "",
                data: {},
                timestamp: false
            };

            this.options = $.extend({}, defaults, options);
        },
        loading: function(callback){

            var url = this.options.url;

            if (this.options.timestamp)
            {
                url = url + "?" + new Date().getTime();
            }

            if (this.options.method == "get")
            {
                $.get(
                    url,
                    this.options.data,
                    function(data)
                    {
                        definition = data;
                        this.isLoaded = true;
                        callback(data);
                    },
                    "json"
                );
            }
            else
            {
                $.post(
                    url,
                    this.options.data,
                    function(data)
                    {
                        definition = data;
                        this.isLoaded = true;
                        callback(data);
                    },
                    "json"
                );
            }
        }
    });

}(DTableModule, jQuery));