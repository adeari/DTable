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
    </style>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-header">
                <h1>DTable</h1>
            </div>

            <div id="table">
                <div data-dtable="loading" class="loading">
                    Loading...
                </div>
            </div>

            <div class="page-header">
                <h1>DTable2</h1>
            </div>

            <div id="table2">
                <div data-dtable="loading" class="loading">
                    Loading...
                </div>
            </div>

        </div>
    </div>
</div>

<script src="js/jquery.js"></script>
<script src="js/nunjucks.js"></script>
<script src="js/dtable/dtable.jquery.min.js"></script>

<!-- just for development, not needed in prod -->
<script src="//localhost:35729/livereload.js"></script>

<script>

    // extending an old module example
    DTableModule.extendModule(DTableModule.MODULE_LOADING, 'default', 'test', {
        init: function(options, dtable) {
            this._super(options, dtable);
            console.log('test');
        }
    });

    $().ready(function(){

        $("#table").dtable({
            template: {
                options: {
                    view_dir: '/js/dtable/views'
                }
            },
            definition: {
                options: {
                    url: "/source.php?table=example_01&def",
                    timestamp: true
                }
            },
            source: {
                options: {
                    url: "/source.php?table=example_01"
                }
            },
            loading: {
                name: 'test'
            }
        });

        $("#table2").dtable({
            template: {
                options: {
                    view_dir: '/js/dtable/views'
                }
            },
            definition: {
                options: {
                    url: "/source.php?table=example_02&def",
                    timestamp: true
                }
            },
            source: {
                options: {
                    url: "/source.php?table=example_02"
                }
            }
        });
    });
</script>
</body>
</html>

