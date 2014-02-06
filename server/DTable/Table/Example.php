<?php

namespace DTable\Table;

use DTable\Def\Table;

class Example extends Table
{
    protected function config()
    {
        $this->set("title", "Example 01");
        $this->set("db_table", "example_01");

        $this->addColumn("col_a", "Column A")
            ->order()
            ->attributes(["style" => "color: #f00"]);

        $this->addColumn("col_b", "Column B")
            ->order()
            ->filter("filter me");

        $this->addColumn("col_c", "Column C")
            ->order();

        $this->addColumn("col_d", "Column D")
            ->filter();

        $this->addColumn("col_e", "Column E")
            ->filter("");
    }
}
