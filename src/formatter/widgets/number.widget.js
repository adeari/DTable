(function (DTableModule, $) {

    DTableModule.newModule(DTableModule.MODULE_FORMATTER_WIDGET, "number", {
        defOptions: function(){
            return {
                number_format: '0,0.0',
                language: 'en',
                force_number: false
            };
        },
        format: function (value, options) {
            options = this.getOptions(options);

            //console.log(parseInt(value));
            if (!isNaN(parseInt(value)) || options.force_number)
            {
                numeral.language(options.language);
                value = numeral(value).format(options.number_format);
            }

            return value;
        }
    });

}(DTableModule, jQuery));