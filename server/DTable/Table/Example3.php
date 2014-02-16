<?php

namespace DTable\Table;

use DTable\Def\Table;

class Example3 extends Table
{
    protected function config()
    {
        $this->set("title", "Example 01");
        $this->set("db_table", "example_03");

        $this->addColumn("col_a", "Column A");
    }
}
