(function(IFace, $){

    IFace.add('formatter_widget', {
        init: function(options, dtable)
        {
            this.options = $.extend(true, {}, this.defOptions(), options);
            this.dtable = dtable;
        },
        defOptions: function(){
            return {};
        },
        getOptions: function(options){
            if (options != undefined)
            {
                return $.extend(true, {}, this.options, options);
            }
            else
            {
                return $.extend(true, {}, this.options);
            }
        },
        format: function (value, options) {
            return value;
        }
    });


}(DTableInterfaces, jQuery));