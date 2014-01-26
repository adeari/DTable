(function(DTableModule){

    DTableModule.newModule(DTableModule.MODULE_SEARCH, "default", {
        init: function(options, dtable){

            this.dtable = dtable;
        },
        update: function()
        {
            this.dtable.update();
        },
        getParams: function(){
            var params = {
                per_page: this.dtable.definition.getPagination().rows_per_page,
                offset: this.dtable.pagination.getOffset()
            };

            //console.log(params);

            return params;
        }
    });

}(DTableModule));