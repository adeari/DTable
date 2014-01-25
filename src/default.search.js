(function(DTableModule){

    DTableModule.newModule(DTableModule.MODULE_SEARCH, "default", {
        init: function(options, dtable){
            this.perPage = 20;
            this.dtable = dtable;
        },
        setPerPage: function(count){
            this.perPage = count;
            this.dtable.logger.info("rows per page: " + count);
        },
        getParams: function(){
            return {
                per_page: this.perPage
            };
        }
    });

}(DTableModule));