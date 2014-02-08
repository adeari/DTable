<?php

namespace web;
use DTable\Db\Handle;

require_once __DIR__ . "/../Bootup.php";

$handle = new Handle();

if (isset($_GET['table']) && $_GET['table'] == 'example_02')
{
    sleep(2);
}

$handle->request();