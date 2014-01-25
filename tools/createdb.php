<?php

require_once __DIR__ . "/ExampleTable.php";

class CreateExampleTable
{
    protected $rowCount;
    protected $pdo;
    protected $columnDef;
    protected $column;
    protected $lipsum;
    protected $rowNum = 0;

    protected $cache = [];
    protected $cacheCount = 0;

    public function __construct($rowCount = 1000)
    {
        $this->rowCount = $rowCount;

        $table = ExampleTable::getInstance()->getDef();
        $this->columnDef = $table["columns"];

        $dbPath = __DIR__ . "/../www-root/db";

        if (!is_dir($dbPath))
        {
            mkdir($dbPath, 0777, true);
        }
        $dbPath = realpath($dbPath);

        $this->pdo = new PDO("sqlite:{$dbPath}/example.sq3");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->column = '"' . implode('","', array_keys($this->columnDef)) . '"';

        $lipsum = str_replace([".", ",", ";"], ["", "", ""], $this->randomLipsum(500, "words"));
        $lipsum = strtolower($lipsum);
        $this->lipsum = explode(" ", $lipsum);
    }

    public function run()
    {
        $this->createTable();

        for ($i = 0; $i < 1000; $i++)
        {
            $this->createRow();
        }

        $this->save(true);
    }

    protected function createTable()
    {
        $sql = "DROP TABLE IF EXISTS example";
        $this->pdo->exec($sql);

        $columns = [];

        foreach ($this->columnDef as $id => $name)
        {
            $columns[] = "`{$id}` varchar(250) DEFAULT NULL";
        }

        $columns = implode(",", $columns);

        $sql = "CREATE TABLE example (`id`  INTEGER PRIMARY KEY AUTOINCREMENT, {$columns})";
        $this->pdo->exec($sql);
    }

    protected function createRow()
    {
        $this->rowNum++;
        $values = [];
        $first = true;

        foreach ($this->columnDef as $id => $def)
        {
            if ($first)
            {
                $first = false;
                $values[] = $def["title"] . ": " . $this->rowNum;
            }
            else
            {
                $rand = rand(0, count($this->lipsum) - 2);
                $values[] = $this->lipsum[$rand] . ' ' . $this->lipsum[$rand+1];
            }
        }

        $values = '("' . implode('","', $values) . '")';

        $this->cacheRow($values);
    }

    protected function cacheRow(&$row)
    {
        $this->cache[] = &$row;
        $this->cacheCount++;

        $this->save();
    }

    protected function save($force = false)
    {
        if (($this->cacheCount > 50 || $force) && (count($this->cache)))
        {
            $values = implode(",", $this->cache);

            $this->cache = [];
            $this->cacheCount = 0;

            $sql = "INSERT INTO example ({$this->column}) VALUES {$values}";
            $this->pdo->exec($sql);

            echo round($this->rowNum / ($this->rowCount / 100)) . "% ";
        }
    }


    protected function randomLipsum($amount = 1, $what = 'paras', $start = 0)
    {
        return (string)simplexml_load_file('http://www.lipsum.com/feed/xml?amount=$amount&what=$what&start=$start')->lipsum;
    }
}


$create = new CreateExampleTable();
$create->run();
sleep(2);