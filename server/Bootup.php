<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$configFile = __DIR__ . "/../config/Config.php";

if (!is_file($configFile))
{
    throw new \Exception("Config file is required. Create one in " . realpath(__DIR__ . "/../config") . " (you can copy the sample in the some dir)");
}

require_once $configFile;
require_once __DIR__ . "/Loader.php";

$loader = new \SplClassLoader("DTable", __DIR__);
$loader->register();

