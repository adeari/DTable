<?php

require_once __DIR__ . "/Options.class.php";
require_once __DIR__ . "/Column.class.php";

class Table extends Options
{
    public function __construct($title)
    {
        parent::__construct(
            [
                "title",
                "columns"
            ],
            [
                "title" => $title,
                "columns" => []
            ]
        );
    }

    /**
     * Add new column
     *
     * @param $id
     * @param $title
     * @return Column
     */
    public function addColumn($id, $title)
    {
        $column = new Column($title);

        $this->values["columns"][$id] = $column;

        return $column;
    }
}
