<?php

class Source
{
    protected $pdo;

    protected $perPage;

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
        if (!isset($_POST['per_page']))
        {
            throw new Exception("per_page param required");
        }

        $this->perPage = $this->pdo->quote($_POST['per_page']);
    }

    protected function getRows()
    {
        $sql = "SELECT * FROM example LIMIT {$this->perPage}";

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