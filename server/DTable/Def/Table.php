<?php

namespace DTable\Def;

abstract class Table extends Options
{
    /**
     * create a new table def
     *
     * @param array|bool|string $title
     */
    public function __construct($title = "unknown")
    {
        parent::__construct(
            [
                "title",
                "db_table",
                "columns"
            ],
            [
                "db_table" => "example",
                "title" => $title,
                "columns" => []
            ]
        );

        $this->config();
    }

    abstract protected function config();

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