<?php

$data = [];

for ($i = 0; $i < 20; $i++)
{
    $data[] = [
        "col_a" => "col_a_{$i}",
        "col_b" => "col_b_{$i}",
        "col_c" => "col_c_{$i}",
        "col_d" => "col_d_{$i}",
        "col_e" => "col_e_{$i}"
    ];
}

echo json_encode($data);