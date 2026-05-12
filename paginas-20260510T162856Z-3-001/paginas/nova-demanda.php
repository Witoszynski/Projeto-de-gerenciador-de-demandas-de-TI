<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Nova Demanda - TI System</title>
    <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/global.css">
    <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/novas-demanda.css">
    <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/logout.css">
</head>

<body>

    <!-- MENU LATERAL -->
    <div class="menu-lateral">
        <h2>TI System</h2>

        <a href="./dashboard.html">Dashboard</a>
        <a href="./demandas.html ">Demandas</a>
        <a class="ativo" href="#">Nova</a>
        <a href="#" onclick="sair()" class="logout">Sair</a>
    </div>

    <!-- FORMULÁRIO -->
    <div class="container-formulario">

        <h2 class="titulo">Criar Nova Demanda</h2>
        <p class="subtitulo">Preencha os dados abaixo</p>

        <form id="formDemanda">

            <div class="campo">
                <label>Título *</label>
                <input type="text" id="titulo" placeholder="Ex: Ajuste no sistema">
            </div>

            <div class="campo">
                <label>Descrição *</label>
                <textarea id="descricao" rows="4"></textarea>
            </div>

            <div class="campos-grid">

                <div class="campo">
                    <label>Gravidade *</label>

                    <select id="gravidade">
                        <option value="">Selecione</option>
                        <option value="1">1 - Muito baixa</option>
                        <option value="2">2 - Baixa</option>
                        <option value="3">3 - Média</option>
                        <option value="4">4 - Alta</option>
                        <option value="5">5 - Crítica</option>
                    </select>
                </div>

                <div class="campo">
                    <label>Urgência *</label>

                    <select id="urgencia">
                        <option value="">Selecione</option>
                        <option value="1">1 - Pode esperar</option>
                        <option value="2">2 - Pouco urgente</option>
                        <option value="3">3 - Urgente</option>
                        <option value="4">4 - Muito urgente</option>
                        <option value="5">5 - Imediato</option>
                    </select>
                </div>

                <div class="campo">
                    <label>Tendência *</label>

                    <select id="tendencia">
                        <option value="">Selecione</option>
                        <option value="1">1 - Não piora</option>
                        <option value="2">2 - Piora pouco</option>
                        <option value="3">3 - Vai piorar</option>
                        <option value="4">4 - Piora rápido</option>
                        <option value="5">5 - Fora de controle</option>
                    </select>
                </div>


                <div class="campo">
                    <label>Categoria *</label>
                    <select id="categoria">
                        <option value="">Selecione</option>
                        <option>Suporte</option>
                        <option>Melhoria</option>
                        <option>Bug</option>
                        <option>Infraestrutura</option>
                    </select>
                </div>

            </div>

            <div class="campo">
                <label>Prazo *</label>
                <input type="date" id="prazo">
            </div>

            <p id="erro" class="erro"></p>

            <button class="botao">Criar Demanda</button>

        </form>

    </div>

    </div>

    <script src="/javascript-20260510T162856Z-3-001/javascript/nova-demanda.js"></script>
    <script src="/javascript-20260510T162856Z-3-001/javascript/logout.js"></script>

</body>

</html>