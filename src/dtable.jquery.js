/*
 *  DTable
 *  ======
 *
 * https://github.com/kubanka-peter/dtable
 *
 * Contributors: Kubi
 *
 * Created by Kubi; Licensed MIT
 */
(function ($, DTableModule) {

    $.fn.dtable = function (options, core) {

        var dtable;

        if (!this.data("dtable"))
        {
            core = core || "firefly";
            dtable = DTableModule.getModule(DTableModule.MODULE_CORE, core, options, this);
        }
        else
        {
            dtable = this.data("dtable");
        }

        return dtable;
    };

}(jQuery, DTableModule));
