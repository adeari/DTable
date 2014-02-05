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
            </div>
        </div>
    </div>

    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/nunjucks.js"></script>
    <script src="js/dtable/dtable.jquery.min.js"></script>
    <script src="//localhost:35729/livereload.js"></script>

    <script>
        $().ready(function(){
            $("#table").dtable({
                template: {
                    options: {
                        view_dir: '/js/dtable/views'
                    }
                },
                definition: {
                    options: {
                        url: "/source.php?definition=true",
                        timestamp: true
                    }
                },
                source: {
                    options: {
                        url: "/source.php"
                    }
                }
            });
        });
    </script>
</body>
</html>
