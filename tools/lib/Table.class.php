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
                "search", "search.submit", "search.placeholder",
                "columns"
            ],
            [
                "title" => $title,
                "search" => false,
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

    public function search($submit = "Search", $placeholder = "search...")
    {
        $this->set("search.submit", $submit);
        $this->set("search.placeholder", $placeholder);

        return $this;
    }
}
