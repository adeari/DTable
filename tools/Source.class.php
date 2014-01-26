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
        $params = ['per_page', 'offset'];

        foreach ($params as $key)
        {
            if (!isset($_POST[$key]))
            {
                throw new Exception("Required param: " . $key);
            }

            $this->params[$key] = $this->pdo->quote($_POST[$key]);
        }
    }

    protected function getRows()
    {
        $sql = "SELECT * FROM example LIMIT {$this->params['offset']}, {$this->params['per_page']}";

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
        $sql = "SELECT count(id) FROM example";

        $stmt = $this->pdo->query($sql);
        $count = $stmt->fetchColumn();

        return $count ? $count : 0;
    }
}