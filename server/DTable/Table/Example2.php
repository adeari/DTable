<?php

namespace DTable\Table;

use DTable\Def\Table;

class Example2 extends Table
{
    protected function config()
    {
        $this->set("title", "Example 02");
        $this->set("db_table", "example_02");

        $this->addColumn("name", "Name")
            ->order();

        $this->addColumn("value", "value")
            ->order()
            ->filter("filter me");
    }
}