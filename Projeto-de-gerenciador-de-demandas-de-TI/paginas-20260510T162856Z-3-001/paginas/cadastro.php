<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - Sistema TI</title>

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/72de7666a8.js" crossorigin="anonymous"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/login.css">
    <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/logout.css">
</head>

<body class="container-principal">
    <div class="container">

        <!-- Header -->
        <div class="nav-like">
            <h1>Suporte Técnico</h1>
        </div>

        <!-- Form Cadastro-->
        <div class="parent">
            <form class="formulario" id="formCadastro">
                <div class="sub-title">
                    <p>Crie sua conta para acessar o sistema</p>
                </div>

                <div class="input-fields">

                    <div class="input-grupo">
                        <i class="fas fa-user"></i>
                        <input type="text" id="nome" placeholder="Nome completo" required>
                    </div>

                    <div class="input-grupo">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="email" placeholder="Email" required>
                    </div>

                    <div class="input-grupo">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="senha" placeholder="Senha" required>
                        <i class="fas fa-eye mostrar-senha" id="mostrar-senha" onclick="mostrarSenha()"></i>
                    </div>

                    <div class="input-grupo">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="confirmarSenha" placeholder="Confirmar Senha" required>
                        <i class="fas fa-eye mostrar-senha" id="mostrar-confirmar-senha"
                            onclick="mostrarConfirmarSenha()"></i>
                    </div>

                    <p id="erro" class="erro"></p>

                    <button type="submit" class="botao">
                        Cadastrar
                    </button>

                    <div class="rodape">
                        Já tem conta? <a href="login.html">Fazer login</a>
                    </div>
                </div>
            </form>

        </div>

        <!-- Javascript -->
        <script src="/javascript-20260510T162856Z-3-001/javascript/login.js"></script>
</body>

</html>