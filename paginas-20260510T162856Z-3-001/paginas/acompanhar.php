<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Meus Chamados</title>
<link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/cliente.css">
<link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/acompanhar.css">
</head>

<body>

<div class="container">

    <!-- TOPO -->
    <div class="topo-pagina">
        <h2>Meus Chamados</h2>
        <button class="botao-sair" onclick="sair()">Sair</button>
    </div>

    <!-- TABELA DE CHAMADOS -->
    <div class="card">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Status</th>
                    <th>Prioridade</th>
                    <th>GUT</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="lista"></tbody>
        </table>
    </div>

</div>

<script src="/javascript-20260510T162856Z-3-001/javascript/logout.js"></script>
<script src="/javascript-20260510T162856Z-3-001/javascript/acompanhar.js"></script>
</body>
</html>