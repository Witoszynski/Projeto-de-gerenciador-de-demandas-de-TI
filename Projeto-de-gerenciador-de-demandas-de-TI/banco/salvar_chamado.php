<?php

include 'conexao.php';

$titulo = $_POST['titulo'];

$sql = "INSERT INTO chamados (titulo)
VALUES ('$titulo')";

$conn->query($sql);

?>