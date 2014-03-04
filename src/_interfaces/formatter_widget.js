(function(IFace, $){

    IFace.add('formatter_widget', {
        init: function(options, dtable)
        {
            this.options = $.extend(this, {}, this.getDefaults(), options);
            this.dtable = dtable;
        },
        getDefaults: function(){
            return {};
        },
        getOptions: function(options){

            if (options != undefined)
            {
                return $.extend(true, {}, this.getDefaults(), this.options, options);
            }
            else
            {
                return $.extend(true, {}, this.getDefaults(), this.options);
            }
        },
        format: function (value, options) {
            return value;
        }
    });


}(DTableInterfaces, jQuery));