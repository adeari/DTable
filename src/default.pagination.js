(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_PAGINATION, "default", {
        init: function(options, dtable){
            var defaults = {
                show_first_and_last: true,
                pages: 5,
                rows_per_page: 20
            };

            this.page = 1;
            this.dtable = dtable;
            this.options = $.extend({}, defaults, options);

            var obj = this;

            dtable.table.on("click", '[data-dtable="page"]', function(){
                var link = $(this);
                var page = link.attr("data-page");

                obj.setPage(page);

                return false;
            });

        },
        // current page
        getPage: function(){
            return this.page;
        },
        setPage: function(page){
            this.page = parseInt(page);

            this.dtable.search.update();
        },
        // pagination first and last page show?
        getShowFirstLast: function(){
            return this.options.show_first_and_last;
        },
        // pagination, shown pages
        getPageNum: function(){
            return this.options.pages;
        },
        // number of results per page
        getRowsPerPage: function(){
            return this.options.rows_per_page;
        },
        setRowsPerPage: function(rows){
            this.options.rows_per_page = rows;
        },
        getMaxPage: function(){
            return Math.ceil(this.dtable.source.getCount() / this.dtable.definition.getPagination().rows_per_page);
        },
        getOffset: function(){
            return (this.page * this.options.rows_per_page) - this.options.rows_per_page;
        },
        getPagesArr: function(){
            var maxPage = this.getMaxPage();
            var minPage = 1;

            var offset = Math.round((this.dtable.definition.getPagination().pages - 1) / 2);
            var start = this.getPage() - offset;
            var end = this.getPage() + offset;

            start = Math.max(minPage, start);
            end = Math.min(maxPage, end);

            if (end < this.dtable.definition.getPagination().pages)
            {
                end = Math.min(this.dtable.definition.getPagination().pages, maxPage);
            }

            if ((end - start) < this.dtable.definition.getPagination().pages)
            {
                start = end - this.dtable.definition.getPagination().pages + 1;
                if (start < minPage)
                {
                    start = minPage;
                }
            }

            var pages = false;

            if (start != end)
            {
                pages = [];

                for (var i = start; i <= end; i++)
                {
                    pages.push(i);
                }
            }

            return pages;
        }
    });

}(DTableModule, jQuery));