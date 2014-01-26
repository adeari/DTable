(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_SEARCH, "default", {
        init: function(options, dtable){

            var defaults = {
                placeholder: "search ...",
                waiting: 600
            };

            this.search = "";

            this.filter = "";

            this.in_progress = false;
            this.update_after = false;

            this.options = $.extend({}, defaults, options);
            this.dtable = dtable;

            var obj = this;

            this.dtable.table.on("keyup", '[data-dtable="search"]', function(){
                obj.search = $(this).val();
                obj.update();
            });

            this.dtable.table.on("keyup", '[data-dtable="filter"]', function(){
                var elem = $(this);

                if (obj.filter === "")
                {
                    obj.filter = {};
                }
                obj.filter[elem.attr('data-column')] = elem.val();
                obj.update();
            });
        },
        update: function()
        {
            var waiting = parseInt(this.options.waiting);
            this.update_after = new Date().getTime() + waiting;

            if (!this.in_progress)
            {
                this.in_progress = true;

                var obj = this;

                var wait = function(){
                    if (new Date().getTime() >= obj.update_after)
                    {
                        obj.in_progress = false;
                        obj.dtable.update();
                    }
                    else
                    {
                        setTimeout(wait, waiting / 2);
                    }
                }

                setTimeout(wait, waiting / 2);
            }
        },
        getParams: function(){
            var params = {
                search: this.search,
                filter: this.filter,
                per_page: this.dtable.definition.getPagination().rows_per_page,
                offset: this.dtable.pagination.getOffset()
            };

            return params;
        }
    });

}(DTableModule, jQuery));