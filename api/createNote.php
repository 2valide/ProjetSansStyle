<?php
include 'notes.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $content = isset($_POST['content']) ? $_POST['content'] : '';

    if (!empty($title) && !empty($content)) {
        createNote($title, $content);
        header('Location: /');
        exit();
    } else {
        echo 'Le titre et le contenu sont requis.';
    }
}
