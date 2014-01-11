/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 * Copyright (c) 2014 Kubi; Licensed MIT
 */

(function ($, DTableModule) {

    function DTable(table, options)
    {
        var defaults = {
            definition: {
                name: "json_url",
                options: {}
            }
        };

        this.table = table;
        this.options = $.extend({}, defaults, options);

        this.definition = DTableModule.getModule(DTableModule.MODULE_DEFINITION, this.options.definition.name, this.options.definition.options);
        this.init();
    }

    DTable.prototype.init = function()
    {
        var def = this.definition;

        this.definition.loading(function(data){
            console.log(def.getTitle());
        });
    };

    $.fn.dtable = function(options) {

        var dtable;

        if (!this.data("DTable"))
        {
            dtable = new DTable(this, options);
            this.data("DTable", dtable);
        }
        else
        {
            dtable = this.data("DTable");
        }

        return dtable;
    };

}(jQuery, DTableModule));
