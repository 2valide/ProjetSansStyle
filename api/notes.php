<?php

include 'connector.php';

function createNote($title, $content) {
    global $pdo;
    $sql = "INSERT INTO notes (title, content, created_datetime) VALUES (:title, :content, NOW())";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['title' => $title, 'content' => $content]);
}

function getNotes() {
    global $pdo;
    $sql = "SELECT * FROM notes ORDER BY created_datetime DESC";
    return $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
}

function getNote($id) {
    global $pdo;
    $sql = "SELECT * FROM notes WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function updateNote($id, $title, $content) {
    global $pdo;
    $sql = "UPDATE notes SET title = :title, content = :content WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id, 'title' => $title, 'content' => $content]);
}

function deleteNote($id) {
    global $pdo;
    $sql = "DELETE FROM notes WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
}
