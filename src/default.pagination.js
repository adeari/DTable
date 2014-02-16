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

    DTableModule.newModule(DTableModule.MODULE_PAGINATION, "default", {
        init: function(options, dtable){
            var defaults = {
                show_first_and_last: true,
                pages: 5,
                rows_per_page: 20,
                rows_per_page_select: [20, 50, 100]
            };

            this.page = 1;
            this.dtable = dtable;
            this.options = $.extend({}, defaults, options);

            var obj = this;

            dtable.table.on("click", '[data-dtable="page"]', function(){
                var link = $(this);
                var page = link.attr("data-page");

                obj.setPage(page);

                obj.dtable.update();

                return false;
            });

            dtable.table.on("change", '[data-dtable="rows-per-page-select"]', function(){
                var rowsPerPage = $(this).val();

                obj.setRowsPerPage(rowsPerPage);

                obj.dtable.update();

                return false;
            });

        },
        // current page
        getPage: function(){
            return this.page;
        },
        setPage: function(page){
            this.page = parseInt(page);
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
        },
        setRowsPerPageSelect: function(s)
        {
            this.options.rows_per_page_select = s;
        },
        getRowsPerPageSelect: function()
        {
            return this.options.rows_per_page_select;
        }
    });

}(DTableModule, jQuery));