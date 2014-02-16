<?php require_once __DIR__ ."/../Bootup.php" ?>
<?php require_once __DIR__ ."/../Parsedown.php" ?>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="DTable - data table for jQuery">
        <meta name="author" content="Kubánka Péter">

        <title>DTable - data table for jQuery</title>

        <!-- original design: http://www.blacktie.co/2013/10/pratt-app-landing-page/ -->

        <!-- Bootstrap CSS -->
        <link href="/css/bootstrap.min.css" rel="stylesheet">
        <link href="/template/css/jasny-bootstrap.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="/template/css/main.css" rel="stylesheet">

        <!-- Font Awscome icons -->
        <link href="/template/css/font-awesome.min.css" rel="stylesheet">

        <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Raleway:400,300,700' rel='stylesheet' type='text/css'>

        <script src="/js/jquery.js"></script>
        <script src="/js/bootstrap.min.js"></script>

        <?php if (Config::$ISDEV): ?>
        <!-- just for development, not needed in prod -->
        <script src="//localhost:35729/livereload.js"></script>
        <?php endif; ?>

    </head>
    <body data-spy="scroll" data-target="#navigation" data-offset="100">

        <!-- navigation -->

        <div class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#"><b>DTable</b></a>
                </div>
                <div id="navigation" class="collapse navbar-collapse bs-js-navbar-scrollspy">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#home">Home</a></li>
                        <li><a href="#examples">Examples</a></li>
                        <li><a href="#documentation">Documentation</a></li>
                        <li><a href="#contribute">Contribution</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- /navigation -->

        <!-- home -->

        <div id="headerwrap">
            <div class="container">
                <div class="row text-center">
                    <div class="col-lg-12">
                        <h1 id="home">Data Table for jQuery</h1>
                        <div class="sec-row">
                            DTable v0.5
                            <a href="/publish/DTable.v0.5.0.tar.gz" class="btn btn-primary btn-lg btn-labeled download-button">
                                <span class="btn-label"><i class="fa fa-floppy-o"></i></span>Download
                            </a>
                            <a href="https://github.com/kubanka-peter/DTable" class="btn btn-default btn-lg btn-labeled" target="_blank">
                                <span class="btn-label"><i class="fa fa-github"></i></span>GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /home -->

        <!-- examples -->
        <div id="examplewrap">
            <div class="container">
                <div class="row text-center">
                    <span id="examples"></span>
                    <br><br>
                    <div class="col-lg-4">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <h3>Simple example</h3>
                                <p class="description">Showing all features of DTable</p>
                                <a href="/dev.php" class="btn btn-success">Continue</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <h3>Custom template</h3>
                                <p class="description">It's showing the flexibility of DTable, we use panels instead of table rows.</p>
                                <a href="/view.php" class="btn btn-success">Continue</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <h3>Create/extend modules</h3>
                                <p class="description">How to add new features.</p>
                                <a href="/create.php" class="btn btn-success">Continue</a>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <hr>
            </div>
        </div>
        <!-- /examples -->

        <!-- docu -->

        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 id="documentation">Documentation</h2>
                </div>
                <div class="col-lg-12">
                    <?php echo Parsedown::instance()->parse(file_get_contents(__DIR__ . "/../../README.md")) ?>
                </div>
            </div>
        </div>
        <!-- /docu -->


        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 id="contribute">Contribute</h2>
                </div>
                <div class="col-lg-12">
                    Comming soon ...
                </div>
            </div>
        </div>


    </body>
</html>