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

            <div id="table">
                <div data-dtable="loading" class="loading">
                    Loading...
                </div>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . "/../_scripts.php" ?>

<script>

    $().ready(function () {

        $("#table").dtable({
            template: {
                options: {
                    view_dir: '/js/DTable/views'
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
                name: "simple"
            }
        });
    });
</script>

<?php include __DIR__ . "/../_ga.php" ?>
</body>
</html>

