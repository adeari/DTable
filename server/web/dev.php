<?php require_once __DIR__ . "/../Bootup.php" ?>
<!DOCTYPE html>
<html>
<head>
    <title>DTable</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <style>
        .loading {
            color: #000000;
        }

        .order-by a {
            color: #222222;
        }

        .order-by a:hover, .order-by a:active, .order-by a:focus {
            outline: 0;
            text-decoration: none;
        }

        .order-by .active {
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
                <h1>DTable <small>showing all built in features</small></h1>
            </div>

            <p>
                "Column A" using number formatter widget, "Column E" using partial formatter widget, other columns using string formatter widget. See page source code.
            </p>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div id="table">
                <div data-dtable="loading" class="loading">
                    Loading...
                </div>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . "/../_scripts.php" ?>

<!-- required for number formatter -->
<script src="js/numeral.min.js"></script>
<script src="js/numeral.languages.min.js"></script>

<script>

    $().ready(function () {

        $("#table").dtable({
            template: {
                options: {
                    view_dir: '/views',
                    table_template: 'default/table.html',
                    rows_template: 'default/rows.html',
                    pagination_template: 'default/pagination.html'
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
            formatter: {
                name: "advanced",
                // this is the default config, we can override it in definition config
                options: {
                    widget: 'string',
                    widget_options: {
                        escape: true
                    }
                }
            }
        });
    });
</script>

<?php include __DIR__ . "/../_ga.php" ?>
</body>
</html>

