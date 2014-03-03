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

    DTableModule.newModule(DTableModule.MODULE_ORDER, 'default', {
        init: function(options, dtable) {

            var defaults = {};

            this.options = $.extend({}, defaults, options);
            this.dtable = dtable;

            this.columns = "";

            var obj = this;

            this.dtable.table.on("click", '[data-dtable="order.asc"]', function(){
                obj.setOrder($(this), 'asc');

                return false;
            })
            this.dtable.table.on("click", '[data-dtable="order.desc"]', function(){
                obj.setOrder($(this), 'desc');

                return false;
            })
        },
        setOrder: function(link, order){
            this.dtable.table.find('[data-dtable="order.asc"]').removeClass("active");
            this.dtable.table.find('[data-dtable="order.desc"]').removeClass("active");

            link.addClass("active");
            this.columns = {};
            this.columns[link.attr("data-dtable-column")] = order;

            this.dtable.update();
        },
        getOrderBy: function() {
            return this.columns;
        }
    });

}(DTableModule, jQuery));