<?php

namespace root;

use DTable\Db\BuildTable;

require_once __DIR__ . "/Bootup.php";

foreach (\Config::$TABLES as $tableClass)
{
    $table = new $tableClass();

    $build = new BuildTable($table);
    $build->run();
}