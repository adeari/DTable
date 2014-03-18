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
            ->formatter(array(
                'widget' => 'number',
                'widget_options' => array(
                    'force_number' => true
                )
            ))
            ->attributes(array('class' => 'col-xs-3'));

        $this->addColumn("col_b", "Column B")
            ->order()
            ->filter("filter me")
            ->attributes(array('class' => 'col-xs-3'));

        $this->addColumn("col_c", "Column C")
            ->order()
            ->attributes(array('class' => 'col-xs-2'));

        $this->addColumn("col_d", "Column D")
            ->filter()
            ->attributes(array('class' => 'col-xs-2'));

        $this->addColumn("col_e", "Column E")
            ->filter("")
            ->formatter(array(
                "widget" => "partial",
                "widget_options" => array(
                    "template_name" => "example",
                    "template" => "custom/columnExample.html"
                )
            ))
            ->attributes(array('class' => 'col-xs-2'));
    }
}
