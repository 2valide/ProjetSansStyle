<?php

$servername = "db";
$username = "user";
$password = "password";
$dbname = "root";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the raw POST data
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);

        // Check if the required fields are present
        if (isset($data['title']) && isset($data['content'])) {
            $title = $data['title'];
            $content = $data['content'];
            $created_datetime = date('Y-m-d H:i:s', strtotime($data['created_datetime']));

            $sql = 'INSERT INTO notes (title, content, created_datetime) VALUES (:title, :content, :created_datetime)';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':content', $content);
            $stmt->bindParam(':created_datetime', $created_datetime);

            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'New note created successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => $stmt->errorInfo()[2]]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $sql = "SELECT * FROM notes";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        json_encode($result);
        echo json_encode($result);
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$conn = null;
?>