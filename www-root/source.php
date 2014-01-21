<?php

require_once __DIR__ . "/lib/Table.class.php";

$table = new Table("Test table");

$table
    ->search()
    ->pagination();

$table
    ->addColumn("col_a", "Column A")
    ->attributes(["style" => "color: #f00"]);

$table
    ->addColumn("col_b", "Column B")
    ->filter("filter me");

$table
    ->addColumn("col_c", "Column C");

$table
    ->addColumn("col_d", "Column D")
    ->filter();

$table
    ->addColumn("col_e", "Column E")
    ->filter("");

$def = $table->toArray();


if (isset($_GET['definition']))
{
    echo json_encode($def);
}
else
{
    $data = [];
    $columns = array_keys($def["columns"]);

    for ($i = 0; $i < $def["pagination"]["rows_per_page"]; $i++)
    {
        $row = [];
        foreach ($columns as $col)
        {
            $row[$col] = "cell {$col}.{$i}";
        }

        $data[] = $row;
    }

    echo json_encode($data);
}