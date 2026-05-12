<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Demandas</title>

  <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/global.css">
  <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/demanda.css">
  <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/logout.css">

</head>

<body>

  <div class="menu-lateral">
    <h2>TI System</h2>
    <a href="./dashboard.html">Dashboard</a>
    <a class="ativo" href="#">Demandas</a>
    <a href="./usuarios.html">Usuários</a>
    <a href="#" onclick="sair()" class="logout">Sair</a>
  </div>

  <div class="conteudo">

    <h1>Demandas</h1>

    <!-- FILTRO POR PRIORIDADE E TÍTULO-->
    <div class="filtros">

      <label for="pesquisaTitulo">Pesquisar demanda:</label>
      <input type="text" id="barraPesquisa" placeholder="Pesquisar por título" name="barraPesquisa"
        oninput="carregarTabela()" />

      <label>Filtrar por categoria:</label>

      <select id="filtroCategoria" onchange="carregarTabela()">
        <option value="">Todas</option>
        <option value="Suporte">Suporte</option>
        <option value="Melhoria">Melhoria</option>
        <option value="Bug">Bug</option>
        <option value="Infraestrutura">Infraestrutura</option>
      </select>

      <label>Filtrar por prioridade:</label>

      <select id="filtroPrioridade" onchange="carregarTabela()">
        <option value="">Todas</option>
        <option value="Alta">Alta</option>
        <option value="Média">Média</option>
        <option value="Baixa">Baixa</option>
      </select>

      <label>Filtrar por status:</label>

      <select id="filtroStatus" onchange="carregarTabela()">
        <option value="">Todas</option>
        <option value="Pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluído">Concluído</option>
      </select>
    </div>

    <div class="acoes-lote">

      <button onclick="alterarStatusLote('Pendente')" class="pendente">
        Pendente
      </button>

      <button onclick="alterarStatusLote('Em andamento')" class="emAndamento">
        Em andamento
      </button>

      <button onclick="alterarStatusLote('Concluído')" class="concluido">
        Concluir
      </button>

      <button onclick="excluirSelecionadas()" class="excluir">
        Excluir Selecionadas
      </button>

    </div>

    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" onclick="selecionarTodas(this)">
          </th>
          <th>ID</th>
          <th>Usuário</th>
          <th>Título</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Prioridade</th>
          <th>Status</th>
          <th>Data</th>
          <th>Excluir</th>
        </tr>
      </thead>

      <tbody id="tabelaDemandas"></tbody>

    </table>

    <button class="botao" onclick="abrirPopup()"> + Nova demanda</button>
  </div>

  <!--POP UP DE NOVA DEMANDA-->
  <div class="overlay" id="overlay">
    <div class="popup">

      <button class="fechar" onclick="fecharPopup()">X Fechar</button>

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
  </div>
  </div>



  <!--SCRIPT-->
  <script src="/javascript-20260510T162856Z-3-001/javascript/nova-demanda.js"></script>
  <script src="/javascript-20260510T162856Z-3-001/javascript/api.js"></script>
  <script src="/javascript-20260510T162856Z-3-001/javascript/demandas.js"></script>

</body>

</html>