<?php

$servername = "db";
$username = "user";
$password = "password";
$dbname = "root";

$connector = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$connector->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    if (isset($data['title']) && isset($data['content'])) {
        $title = $data['title'];
        $content = $data['content'];
        $created_datetime = date('Y-m-d H:i:s', strtotime($data['created_datetime']));

        $sql = 'INSERT INTO notes (title, content, created_datetime) VALUES (:title, :content, :created_datetime)';
        $stmt = $connector->prepare($sql);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':created_datetime', $created_datetime);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $stmt->errorInfo()]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT * FROM notes";
    $stmt = $connector->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    json_encode($result);
    echo json_encode($result);
}

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    if (isset($data['id'])) {
        $id = $data['id'];

        $sql = 'DELETE FROM notes WHERE id = :id';
        $stmt = $connector->prepare($sql);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $stmt->errorInfo()]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
}

if ($_SERVER["REQUEST_METHOD"] === "UPDATE") {
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    if (isset($data['id']) && isset($data['title']) && isset($data['content'])) {
        $id = $data['id'];
        $title = $data['title'];
        $content = $data['content'];

        $sql = 'UPDATE notes SET title = :title, content = :content WHERE id = :id';
        $stmt = $connector->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $content);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $stmt->errorInfo()]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
}

?>