<?php

require_once __DIR__ . "/../tools/ExampleTable.php";


if (isset($_GET['definition']))
{
    echo json_encode(ExampleTable::getInstance()->getDef());
}
else
{
    $dbPath = __DIR__ . "/db";
    $pdo = new PDO("sqlite:{$dbPath}/example.sq3");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM example LIMIT 20";
    $stmt = $pdo->query($sql);

    $result = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
    {
        $result[] = $row;
    }

    echo json_encode($result);
}