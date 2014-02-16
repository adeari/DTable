<?php require_once __DIR__ ."/../Bootup.php" ?>
<!DOCTYPE html>
<html>
<head>
    <title>DTable</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
    <style>
        .loading
        {
            color: #000000;
        }
        .order-by a
        {
            color: #222222;
        }
        .order-by a:hover, .order-by a:active, .order-by a:focus {
            outline: 0;
            text-decoration: none;
        }
        .order-by .active
        {
            color: #0099FF;
            text-decoration: none;
        }

        .js-loading-overlay {

            position:absolute;
            top:0; bottom:0;
            left:0; right:0;

            z-index:199;

            background:#fff;
            opacity:0.8;

            border-radius: inherit;
        }

    </style>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <p>When the table loading, an overlay shown over it. I use 2s sleep in the backend.</p>
        </div>
        <div class="col-lg-12">
            <div class="page-header">
                <h1>DTable</h1>
            </div>

            <div id="table" style="position: relative"></div>

        </div>
    </div>
</div>

<script src="js/jquery.js"></script>
<script src="js/nunjucks.js"></script>
<script src="js/DTable/DTable.jquery.js"></script>

<?php if (Config::$ISDEV): ?>
<!-- just for development, not needed in prod -->
<script src="//localhost:35729/livereload.js"></script>
<?php endif; ?>

<script>


    $.fn.loading = function(state, addClass) {

        // element to animate
        var $this = $(this);
        // hide or show the overlay
        state = state === undefined ? true : !!state;

        $this.each(function(i, element) {

            var $element = $(element);

            // if we want to create and overlay and any one exists
            if( state && $element.find(".js-loading-overlay").length === 0 ) {

                // creates the overlay
                var $overlay = $("<div/>").addClass("js-loading-overlay");
                // add a class
                if(addClass !== undefined) {
                    $overlay.addClass(addClass);
                }
                // appends it to the current element
                $element.append( $overlay ).addClass("js-loading");
                // show the element
                $overlay.stop().hide().fadeIn(400);

                // Disables all inputs
                $this.find("input,button,.btn").addClass("disabled").prop("disabled", true);

                // if we want to destroy this overlay
            } else if(!state) {
                // just destroys it
                $element.removeClass("js-loading").find(".js-loading-overlay").remove();

                // Unabled all inputs
                $this.find("input,button,.btn").removeClass("disabled").prop("disabled", false);
            }

        });

        return this;
    };

    // extend module
    DTableModule.extendModule(DTableModule.MODULE_FORMATTER, "simple", "new_module_name", {
        format: function(colId, value){
            // you can call parent function with _super
            value = this._super(colId, value);

            return colId + this.options.separator + value;
        }
    });

    // create new module
    //   for interface, see dtable.modules.js and some implementation to check what you have to do
    DTableModule.newModule(DTableModule.MODULE_LOADING, "overlay", {
        init: function(options, dtable)
        {
            this.dtable = dtable;
        },
        startLoading: function(){
            this.dtable.table.loading();
        },
        stopLoading: function(){
            this.dtable.table.loading(false);
        }
    });

    $().ready(function(){

        // we use example_02, its have 2s sleep on loading
        $("#table").dtable({
            template: {
                options: {
                    view_dir: '/js/DTable/views'
                }
            },
            definition: {
                options: {
                    url: "/source.php?table=example_02&def",
                    timestamp: true
                }
            },
            loading:
            {
                name: "overlay"
            },
            source: {
                options: {
                    url: "/source.php?table=example_02"
                }
            },
            formatter: {
                name: "new_module_name",
                options: {
                    separator: " Chiken! "
                }
            }
        });

    });
</script>
</body>
</html>

