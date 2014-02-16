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
(function(DTableModule, $){

    DTableModule.newModule(DTableModule.MODULE_LOADING, "default", {
        init: function(options, dtable){

            this.dtable = dtable;

            this.div = false;
            this.enabled = false;
            this.is_loading = false;

            var div = dtable.table.find('[data-dtable="loading"]');

            if (div.length)
            {
                this.enabled = true;

                this.div = div;
            }

        },
        startLoading: function(){

            var obj = this;
            this.dtable.table.trigger("dtable.start_loading");

            if (!this.is_loading && this.enabled)
            {
                this.is_loading = true;

                setTimeout(function(){

                    if (obj.is_loading)
                    {
                        obj.dtable.table.find('[data-dtable="loading-container"]').html(obj.div);
                    }

                }, 300)
            }
        },
        stopLoading: function(){

            this.dtable.table.trigger("dtable.stop_loading");

            if (this.enabled)
            {
                this.is_loading = false;
                var div = this.dtable.table.find('[data-dtable="loading"]');

                if (div.length)
                {
                    div.remove();
                }
            }
        }
    });

}(DTableModule, jQuery));