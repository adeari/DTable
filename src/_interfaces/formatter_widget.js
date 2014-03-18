(function (IFace, $) {

    IFace.add('formatter_widget', {
        init: function (options, dtable) {
            this.dtable = dtable;
            this.options = $.extend(true, {}, this.getDefaults(), options);
        },
        getDefaults: function () {
            return {};
        },
        format: function (columnId, value, values) {
            return value;
        }
    });


}(DTableInterfaces, jQuery));
