<?php

require_once __DIR__ . "/ExampleTable.php";

$dbPath = __DIR__ . "/../www-root/db";
if (!is_dir($dbPath))
{
    mkdir($dbPath, 0777, true);
}
$dbPath = realpath($dbPath);


$table = ExampleTable::getInstance()->getDef();

$pdo = new PDO("sqlite:{$dbPath}/example.sq3");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$sql = "DROP TABLE IF EXISTS example";
$pdo->exec($sql);

$sql = "CREATE TABLE example (`id`  INTEGER PRIMARY KEY AUTOINCREMENT,";

$columns = [];
foreach (array_keys($table["columns"]) as $id)
{
    $columns[] = "`{$id}` varchar(250) DEFAULT NULL";
}

$sql .= implode(",", $columns);
$sql .= ")";

$pdo->exec($sql);

die(1);

for ($i = 0; $i < 1000; $i++)
{

}