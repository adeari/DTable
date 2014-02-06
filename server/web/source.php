<?php

namespace web;
use DTable\Db\Handle;

require_once __DIR__ . "/../Bootup.php";

$handle = new Handle();

$handle->request();