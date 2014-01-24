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
                "pagination", "pagination.rows_per_page", "pagination.pages", "pagination.show_first_last",
                "search", "search.submit", "search.placeholder",
                "columns"
            ],
            [
                "title" => $title,
                "pagination" => false,
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

    /**
     * setup pagination
     *
     * @param int $rowsPerPage      rows count on a page
     * @param int $pages            pager page count, must be odd number
     * @param bool $showFirstLast   show first and last page in pager
     * @return $this
     */
    public function pagination($rowsPerPage = 20, $pages = 5, $showFirstLast = true)
    {
        $this->set("pagination.rows_per_page", $rowsPerPage);
        $this->set("pagination.pages", $pages);
        $this->set("pagination.show_first_last", $showFirstLast);

        return $this;
    }

    public function search($submit = "Search", $placeholder = "search...")
    {
        $this->set("search.submit", $submit);
        $this->set("search.placeholder", $placeholder);

        return $this;
    }
}
