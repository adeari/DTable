<?php

class Source
{
    protected $pdo;

    protected $params = [];

    public function __construct()
    {
        $dbPath = __DIR__ . "/../www-root/db";

        $this->pdo = new PDO("sqlite:{$dbPath}/example.sq3");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function data()
    {
        $this->updateParams();

        $result = [
            'count' => $this->calcCount(),
            'rows' => $this->getRows()
        ];

        echo json_encode($result);
    }

    protected function updateParams()
    {
        $params = ['per_page', 'offset', 'search'];
        $quote = ['per_page', 'offset'];

        foreach ($params as $key)
        {
            if (!isset($_POST[$key]))
            {
                throw new Exception("Required param: " . $key);
            }

            if (in_array($key, $quote))
            {
                $this->params[$key] = $this->pdo->quote($_POST[$key]);
            }
            else
            {
                $this->params[$key] = $_POST[$key];
            }
        }
    }

    protected function getWhere()
    {
        $where = [];

        if ($this->params['search'] != '')
        {
            $search = $this->pdo->quote("{$this->params['search']}%");
            $where[] = "col_b LIKE {$search}";
        }


        if (count($where))
        {
            return "WHERE " . implode(' AND ', $where);
        }
        else
        {
            return '';
        }

    }

    protected function getRows()
    {
        $where = $this->getWhere();

        $sql = "SELECT * FROM example {$where} LIMIT {$this->params['offset']}, {$this->params['per_page']}";

        $rows = [];
        $stmt = $this->pdo->query($sql);

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
        {
            $rows[] = $row;
        }

        return $rows;
    }

    protected function calcCount()
    {
        $where = $this->getWhere();
        $sql = "SELECT count(id) FROM example {$where}";

        $stmt = $this->pdo->query($sql);
        $count = $stmt->fetchColumn();

        return $count ? $count : 0;
    }
}