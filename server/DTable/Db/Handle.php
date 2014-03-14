<?php

namespace DTable\Db;

use DTable\Def\Table;

class Handle
{
    /** @var  Table */
    protected $table;
    /** @var  \PDO */
    protected $pdo;

    protected $tableName;
    protected $columns;

    protected $search, $filter, $perPage, $offset, $order;

    protected $sql;

    public function __construct()
    {
        $this->pdo = new \PDO(\Config::$PDO_DSN, \Config::$PDO_USER, \Config::$PDO_PWD);
        $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    }

    /**
     * Handle DTable requests
     */
    public function request()
    {
        $this->table = $this->getTable()->toArray();
        $this->tableName = BuildTable::escape($this->table['db_table']);

        $columns = array();
        foreach ($this->table['columns'] as $colId => $value)
        {
            $columns[] = BuildTable::escape($colId);
        }

        $this->columns = implode(", ", $columns);

        $def = isset($_GET["def"]);

        if ($def)
        {
            $this->handleDef();
        }
        else
        {
            $this->handleData();
        }
    }

    /**
     * get table def
     *
     * @throws \Exception
     * @internal param $table
     */
    protected function handleDef()
    {
        echo json_encode($this->table);
    }

    /**
     * get table rows
     */
    protected function handleData()
    {
        $this->getDataParams();

        $result = array(
            'count' => $this->calcCount(),
            'rows' => $this->getRows(),
            'sql' => $this->sql                     // only for debug purposes
        );

        echo json_encode($result);
    }

    /**
     * incoming params are:
     *   per_page: int, indicates number of records per page, we have to build this num of rows
     *   offset: int, skip this amount of rows
     *   search: string, global search
     *   filter: array, if its an array, some column filter specified, key = col_id, value = filter value
     *   order: array, if its an array, order by specified, key = col_Id, value = asc|desc
     *
     * @throws \Exception
     */
    protected function getDataParams()
    {
        $required = $params = array('per_page', 'offset', 'search', 'filter', 'order');

        foreach ($required as $key)
        {
            if (!isset($_POST[$key]))
            {
                throw new \Exception("{$key} required");
            }
        }

        $this->perPage = round((int)$_POST['per_page']);
        $this->offset = round((int)$_POST['offset']);
        $this->search = ($_POST['search'] != "") ? $this->pdo->quote('%' . $_POST['search'] . '%') : false;

        if (is_array($_POST['filter']))
        {
            $this->filter = array();

            foreach ($_POST['filter'] as $key => $value)
            {
                $this->checkColumn($key);

                $key = BuildTable::escape($key);
                $this->filter[$key] = $this->pdo->quote('%' . $value . '%');
            }
        }

        if (is_array($_POST['order']))
        {
            $this->order = array();

            foreach ($_POST['order'] as $key => $value)
            {
                $this->checkColumn($key);

                $key = BuildTable::escape($key);
                $this->order[$key] = ($value == 'desc') ? "DESC" : "ASC";
            }
        }
    }

    /**
     * sql where part
     *
     * @return array|string
     */
    protected function buildWhere()
    {
        $where = array();

        if ($this->search != "")
        {
            $sub = array();

            foreach ($this->table['columns'] as $colId => $def)
            {
                $colId = BuildTable::escape($colId);
                $sub[] = "{$colId} LIKE {$this->search}";
            }

            $where[] = "(" . implode(" OR ", $sub) . ")";
        }

        if ($this->filter)
        {
            foreach ($this->filter as $colId => $filter)
            {
                $colId = BuildTable::escape($colId);
                $where[] = "{$colId} LIKE {$filter}";
            }
        }

        if (count($where))
        {
            $where = " WHERE " . implode(" AND ", $where);
        }
        else
        {
            $where = "";
        }

        return $where;
    }

    /**
     * build sql order by part
     */
    protected function buildOrderBy()
    {
        $order = array();

        if ($this->order)
        {
            foreach ($this->order as $key => $value)
            {
                $key = BuildTable::escape($key);

                $order[] = "{$key} {$value}";
            }
        }

        if (count($order))
        {
            $order = " ORDER BY " . implode(", ", $order);
        }
        else
        {
            $order = "";
        }

        return $order;
    }

    /**
     * calc num of results
     *
     * @return int|string
     */
    protected function calcCount()
    {
        $where = $this->buildWhere();

        $stmt = $this->pdo->query("SELECT count(id) FROM {$this->tableName} {$where}");
        $count = $stmt->fetchColumn();

        return $count ? $count : 0;
    }

    /**
     * get result
     *
     * @return array
     */
    protected function getRows()
    {
        $where = $this->buildWhere();
        $order = $this->buildOrderBy();

        $this->sql = "SELECT {$this->columns} FROM {$this->tableName} {$where} {$order} LIMIT {$this->offset}, {$this->perPage}";

        $rows = array();
        $stmt = $this->pdo->query($this->sql);

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC))
        {
            $rows[] = $row;
        }

        return $rows;
    }

    /**
     * col is exist?
     *
     * @param $col
     * @throws \Exception
     */
    protected function checkColumn($col)
    {
        if (!isset($this->table['columns'][$col]))
        {
            throw new \Exception("Invalid column : {$col}");
        }
    }

    /**
     * Get the table obj
     *
     * @return Table
     * @throws \Exception
     */
    protected function getTable()
    {
        $table = $_GET["table"];

        $class = (isset(\Config::$TABLES[$table])) ? \Config::$TABLES[$table] : false;

        if (!$class)
        {
            throw new \Exception("Invalid table: {$table}");
        }

        return new $class;
    }

}
