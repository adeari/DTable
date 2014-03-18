(function (DTableModule, $) {

    DTableModule.newModule(DTableModule.MODULE_FORMATTER_WIDGET, "number", {
        getDefaults: function(){
            return {
                number_format: '0,0.0',
                language: 'en',
                force_number: false
            };
        },
        format: function (columnId, value, values) {

            if (!isNaN(parseInt(value)) || this.options.force_number)
            {
                numeral.language(this.options.language);
                value = numeral(value).format(this.options.number_format);
            }

            return value;
        }
    });

}(DTableModule, jQuery));
