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
                div.detach();

                this.div = div;
            }

        },
        startLoading: function(){

            var obj = this;

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