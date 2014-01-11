(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_DEFINITION, "json_url", {
        init: function(options)
        {
            this.definition = {};

            var defaults = {
                method: "get",
                url: "",
                data: {},
                timestamp: false
            };

            this.options = $.extend({}, defaults, options);
        },
        getTitle: function()
        {
            return this.definition.title;
        },
        getColumns: function()
        {
            return this.definition.columns;
        },
        getPagination: function()
        {
            return this.definition.pagination;
        },
        search: function()
        {
            return this.definition.search;
        },
        loading: function(callback)
        {
            var url = this.options.url;
            var obj = this;

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
                        obj.definition = data;
                        obj.isLoaded = true;
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
                        obj.definition = data;
                        obj.isLoaded = true;
                        callback(data);
                    },
                    "json"
                );
            }
        }
    });

}(DTableModule, jQuery));
