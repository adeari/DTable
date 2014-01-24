<?php

require_once __DIR__ . "/lib/Table.class.php";;

class ExampleTable
{
    protected static $instance;

    protected $table;

    protected function __construct(){
        $this->table = new Table("Test table");

        $this->table
            ->search()
            ->pagination();

        $this->table
            ->addColumn("col_a", "Column A")
            ->attributes(["style" => "color: #f00"]);

        $this->table
            ->addColumn("col_b", "Column B")
            ->filter("filter me");

        $this->table
            ->addColumn("col_c", "Column C");

        $this->table
            ->addColumn("col_d", "Column D")
            ->filter();

        $this->table
            ->addColumn("col_e", "Column E")
            ->filter("");
    }

    /**
     * @return ExampleTable
     */
    public static function getInstance()
    {
        if (!self::$instance)
        {
            self::$instance = new ExampleTable();
        }

        return self::$instance;
    }

    public function getDef()
    {
        return $this->table->toArray();
    }
}