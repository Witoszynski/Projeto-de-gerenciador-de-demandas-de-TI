<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Sistema TI</title>

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/72de7666a8.js" crossorigin="anonymous"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/login.css">
    <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/logout.css">

    

</head>

<body>

    <div class="container-principal">
        <div class="container">

            <!-- Header -->
            <div class="nav-like">
                <h1>TI System</h1>
            </div>

            <!-- Form -->
            <div class="parent">
                <form action="../api/login.php" method="POST" class="formulario" id="formLogin">>
                    <div class="sub-title">
                        <p>Acesse sua conta</p>
                    </div>

                    <div class="input-fields">

                        <div class="input-grupo">
                            <i class="fas fa-user"></i>
                            <input type="email" placeholder="Email" name="email" id="email">
                        </div>

                        <div class="input-grupo">
                            <i class="fas fa-lock"></i>
                            <input type="password" name="senha" id="senha" placeholder="Senha">
                            <i class="fas fa-eye mostrar-senha" id="mostrar-senha" onclick="mostrarSenha()"></i>
                        </div>

                    </div>

                    <p id="erro" class="erro"></p>

                    <button type="submit" class="botao">Entrar</button>

                    <div class="rodape">
                        <p>Não tem uma conta? <a href="cadastro.html">Cadastre-se</a></p>
                    </div>

                </form>
            </div>

        </div>
    </div>

    

    <!-- Javascript -->
    <script src="/javascript-20260510T162856Z-3-001/javascript/login.js"></script>

</body>

</html>