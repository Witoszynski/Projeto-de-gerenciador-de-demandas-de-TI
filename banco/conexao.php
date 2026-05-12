<?php

// Endereço do servidor MySQL
$host = "localhost";

// Usuário padrão do XAMPP
$usuario = "root";

// Senha do MySQL
$senha = "";

// Nome do banco criado no phpMyAdmin
$banco = "sistema_suporte";


// Cria conexão com MySQL
$conn = new mysqli($host, $usuario, $senha, $banco);


// Verifica erro na conexão
if ($conn->connect_error) {

    die("Erro na conexão: " . $conn->connect_error);

}


// Define UTF-8
$conn->set_charset("utf8");

?>

<?php

$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "sistema_suporte";

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$conn->set_charset("utf8");

?>