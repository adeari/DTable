<?php

require_once __DIR__ . "/../tools/ExampleTable.php";
require_once __DIR__ . "/../tools/Source.class.php";

if (isset($_GET['definition']))
{
    echo json_encode(ExampleTable::getInstance()->getDef());
}
else
{
    //sleep(1);
    $source = new Source();

    $source->data();
}