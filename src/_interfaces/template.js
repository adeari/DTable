(function (IFace) {

    IFace.add('template', {
        isLoaded: false,
        /**
         * Add a template
         *
         * @param templateName
         * @param templateFile
         */
        addTemplate: function (templateName, templateFile) {
        },
        /**
         * return false if the template is not loaded
         *
         * @param templateName
         */
        getTemplate: function (templateName) {
        },
        /**
         * Load unloaded templates
         * @param callback
         */
        loading: function (callback) {
        },
        /**
         * Return the rendered table html
         * @param params
         */
        getTableHtml: function (params) {
        },
        /**
         * Retrun the rendered rows html
         * @param params
         */
        getRowsHtml: function (params) {
        },
        /**
         * Return the rendered pagination html
         * @param params
         */
        getPaginationHtml: function (params) {
        }
    });


}(DTableInterfaces));
