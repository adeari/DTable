(function (IFace, $) {

    IFace.add('formatter_widget', {
        init: function (options, dtable) {
            this.dtable = dtable;
        },
        defOptions: function () {
            return {};
        },
        getOptions: function (options) {

            var result = this.defOptions();

            if (options != undefined) {
                result = $.extend(true, {}, this.defOptions(), options);
            }

            return result;
        },
        format: function (value, options) {
            return value;
        }
    });


}(DTableInterfaces, jQuery));