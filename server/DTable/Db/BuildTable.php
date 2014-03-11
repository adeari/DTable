<?php

namespace DTable\Db;
require_once __DIR__ . "/../../Bootup.php";

use DTable\Def\Table;

class BuildTable
{
    protected $def;
    protected $pdo;
    protected $tableName;
    protected $columns;
    protected $lipsum;
    protected $lipsumCount;
    protected $rows = array();
    protected $rowCount = 0;

    /**
     * Create table and fill with random data
     *
     * @param Table $table
     */
    public function __construct(Table $table)
    {
        $this->def = $table->toArray();
        $this->pdo = new \PDO(\Config::$PDO_DSN, \Config::$PDO_USER, \Config::$PDO_PWD);
        $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        $this->tableName =  self::escape($this->def['db_table']);
        $this->lipsum = explode("|", \Config::$LIPSUM);
        $this->lipsumCount = count($this->lipsum);
    }

    /**
     * run the task
     */
    public function run()
    {
        global $argv;

        $this->log("");
        $this->log("Creating table {$this->tableName} in " . \Config::$PDO_DSN);

        if (!in_array("--no-confirmation", $argv))
        {
            $answer = readline("All data will be lost, continue (y/n)? ");
        }
        else
        {
            $answer = "y";
        }

        if ($answer == "y")
        {
            $this->createTable();

            $range = range(10, 100, 10);

            for ($i = 1; $i <= \Config::$ROWNUM; $i++)
            {
                $percentage = $i / (\Config::$ROWNUM / 100);
                if (in_array($percentage, $range))
                {
                    echo $percentage . "% ";
                }
                $this->addRow();
            }

            $this->insertRow(false, true);

            echo "\n";

            $this->log("done.");
        }
    }

    /**
     * drop and then create table
     */
    protected function createTable()
    {
        $this->pdo->exec("DROP TABLE IF EXISTS {$this->tableName}");

        $columns = array();

        foreach ($this->def["columns"] as $colId => $colDef)
        {
            $colId = self::escape($colId);

            if (isset($colDef['formatter']['widget']) && $colDef['formatter']['widget'] == 'number')
            {
                $columns[] = "`{$colId}` double DEFAULT NULL";
            }
            else
            {
                $columns[] = "`{$colId}` varchar(250) DEFAULT NULL";
            }


            $this->columns[] = $colId;
        }

        $columns = implode(",", $columns);
        $this->columns = implode(",", $this->columns);

        $this->pdo->exec(
            "CREATE TABLE {$this->tableName}
                (
                    `id` int(11) NOT NULL AUTO_INCREMENT,
                    {$columns},
                    PRIMARY KEY (`id`)
                ) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_unicode_ci
            "
        );
    }

    /**
     * add a new row
     */
    protected function addRow()
    {
        $values = array();

        foreach ($this->def['columns'] as $colId => $colDef)
        {
            if (isset($colDef['formatter']['widget']) && $colDef['formatter']['widget'] == 'number')
            {
                $values[] = rand(-99999999, 99999999) / 1000;
            }
            else
            {
                $values[] = $this->pdo->quote($this->getRandomString());
            }
        }

        $values = '(' . implode(',', $values) . ')';

        $this->insertRow($values);
    }

    /**
     * insert multiple row in one query
     *
     * @param $values
     * @param bool $force
     */
    protected function insertRow($values, $force = false)
    {
        if ($values)
        {
            $this->rows[] = $values;
            $this->rowCount++;
        }

        if ($this->rowCount > 100 || $force)
        {
            $values = implode(",", $this->rows);
            $this->pdo->exec("INSERT INTO {$this->tableName} ({$this->columns}) VALUES {$values}");

            $this->rows = array();
            $this->rowCount = 0;
        }
    }

    /**
     * random string
     *
     * @return string
     */
    protected function getRandomString()
    {
        $wordCount = rand(1, 5);

        $str = "";

        for ($i = 0; $i < $wordCount; $i++)
        {
            $str .= ' ' . $this->lipsum[rand(0, $this->lipsumCount - 1)];
        }

        return ltrim($str);
    }


    /**
     * log
     *
     * @param $msg
     */
    protected function log($msg)
    {
        echo $msg . "\n";
    }

    /**
     * escape column name, table name etc.
     *
     * @param $text
     * @return mixed
     */
    public static function escape($text)
    {
        return preg_replace('/[^A-Za-z0-9_]+/', '', $text);
    }
}

