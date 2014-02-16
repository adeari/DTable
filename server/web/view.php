<!DOCTYPE html>
<html>
<head>
    <title>DTable</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <style>
        .box {
            margin: 10px 10px;
        }

        .isotope-item {
            z-index: 2;
        }

        .pagination {
            margin: 0;
        }

        .info
        {
            margin-bottom: 20px;
        }

        .isotope-hidden.isotope-item {
            pointer-events: none;
            z-index: 1;
        }

        /**** Isotope CSS3 transitions ****/

        .isotope,
        .isotope .isotope-item {
            -webkit-transition-duration: 0.3s;
            -moz-transition-duration: 0.3s;
            -ms-transition-duration: 0.3s;
            -o-transition-duration: 0.3s;
            transition-duration: 0.3s;
        }

        .isotope {
            -webkit-transition-property: height, width;
            -moz-transition-property: height, width;
            -ms-transition-property: height, width;
            -o-transition-property: height, width;
            transition-property: height, width;
        }

        .isotope .isotope-item {
            -webkit-transition-property: -webkit-transform, opacity;
            -moz-transition-property: -moz-transform, opacity;
            -ms-transition-property: -ms-transform, opacity;
            -o-transition-property: -o-transform, opacity;
            transition-property: transform, opacity;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-lg-12 info">
            <div class="page-header">
                <h1>DTable
                    <small>template example</small>
                </h1>
            </div>

            <p>In this example we use custom template and isotope to animate/place the table "rows".</p>
        </div>
    </div>

    <div id="table">
        <div data-dtable="loading" class="loading">
            Loading...
        </div>
    </div>

</div>

<script src="/js/jquery.js"></script>
<script src="/template/js/jquery.isotope.min.js"></script>
<script src="/js/nunjucks.js"></script>
<script src="/js/DTable/DTable.jquery.js"></script>

<!-- just for development, not needed in prod -->
<script src="//localhost:35729/livereload.js"></script>

<script>

    $().ready(function () {


        DTableModule.extendModule(DTableModule.MODULE_CORE, "firefly", "isotope", {
            renderTableHtml: function(html) {
                this._super(html);

                this.isoRoot = this.table.find('[data-dtable="table"]');

                this.isoRoot.isotope({
                    itemSelector : '.panel',
                    layoutMode : 'fitRows'
                });
            },
            renderRowsHtml: function (html) {

                var remove = this.isoRoot.find(".panel");
                var obj = this;
                this.isoRoot.isotope("remove", remove, function(){
                    obj.isoRoot.isotope("insert", $(html));
                    obj.isoRoot.isotope("reLayout");
                });
            }
        });


        $("#table").dtable({
            template: {
                options: {
                    view_dir: '/template/div_view'
                }
            },
            definition: {
                options: {
                    url: "/source.php?table=example_03&def",
                    timestamp: true
                }
            },
            source: {
                options: {
                    url: "/source.php?table=example_03"
                }
            },
            formatter: {
                name: "simple"
            }
        }, "isotope");
    });

</script>
</body>
</html>