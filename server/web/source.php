<?php

namespace web;
use DTable\Db\Handle;

require_once __DIR__ . "/../Bootup.php";

$referer = $_SERVER["HTTP_REFERER"];
$url = parse_url($referer);

if ($url['host'] !== 'dtable.devdrive.org' && !\Config::$ISDEV)
{
    header('HTTP/1.0 403 Forbidden');
    echo 'Forbidden';
    die();
}

$handle = new Handle();

if (isset($_GET['table']) && $_GET['table'] == 'example_02')
{
    sleep(2);
}

$handle->request();
