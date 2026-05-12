<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>

  <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/global.css">
  <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/dashboard.css">
  <link rel="stylesheet" href="/css-20260510T162854Z-3-001/css/logout.css">
  <script src="../javascript/logout.js"></script>
  <!-- CHART.JS - biblioteca pronta que cria gráficos automaticamente -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>

<body>

  <div class="menu-lateral">
    <h2>TI System</h2>
    <a class="ativo" href="#">Dashboard</a>
    <a href="./demandas.html">Demandas</a>
    <a href="./usuarios.html">Usuários</a>
    <a href="#" onclick="sair()" class="logout">Sair</a>
  </div>

  <div class="conteudo">

    <div class="topo-pagina">
      <h1>Bem vindo <span id="nomeUsuario"></span>!</h1>
      
    </div>

    <div class="cards-dashboard">
      <div class="card">
        <h3>Total</h3>
        <p id="total"></p>
      </div>

      <div class="card">
        <h3>Pendentes</h3>
        <p id="pendentes"></p>
      </div>

      <div class="card">
        <h3>Concluídas</h3>
        <p id="concluidas"></p>
      </div>
    </div>

    <div class="grafico">
      <canvas id="graficoStatus"></canvas>
    </div>

      <div class="painel-prazos">

    <h2>Demandas próximas do prazo</h2>

    <div id="listaPrazos"></div>

  </div>

  </div>



  <script src="/javascript-20260510T162856Z-3-001/javascript/api.js"></script>

  <script>
    // ==========================
// NOME DO USUARIO LOGADO
// =========================
const usuarioLogado = localStorage.getItem("usuarioLogado");
document.getElementById("nomeUsuario").textContent = usuarioLogado?.split("@")[0] || "";

    // ==========================
    // DASHBOARD
    // =========================
    async function carregarDashboard() {
      const demandas = await listarDemandas();

      carregarPrazos(demandas);

      const pendentes = demandas.filter(d => d.status === "Pendente").length;
      const andamento = demandas.filter(d => d.status === "Em andamento").length;
      const concluidas = demandas.filter(d => d.status === "Concluído").length;

      document.getElementById("total").innerText = demandas.length;
      document.getElementById("pendentes").innerText = pendentes;
      document.getElementById("concluidas").innerText = concluidas;

      // cores do CSS
      const style = getComputedStyle(document.documentElement);
      const primary = style.getPropertyValue('--primary').trim();
      const warning = style.getPropertyValue('--warning').trim();
      const success = style.getPropertyValue('--success').trim();

      new Chart(document.getElementById("graficoStatus"), {
        type: "bar",
        data: {
          labels: ["Pendente", "Em andamento", "Concluído"],
          datasets: [{
            label: "Demandas",
            data: [pendentes, andamento, concluidas],
            backgroundColor: [warning, primary, success],
            borderRadius: 8,
            borderSkipped: false,
            barThickness: 40
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "#0f172a",
                font: { weight: "bold" }
              }
            }
          },
          scales: {
            y: { beginAtZero: true, ticks: { color: "#64748b" }, grid: { color: "#e2e8f0" } },
            x: { ticks: { color: "#64748b" }, grid: { display: false } }
          }
        }
      });
    }

    // ==========================
    // CARREGA PRAZOS DE DEMANDAS
    // =========================
    function carregarPrazos(demandas){
      const lista = document.getElementById("listaPrazos");
      
      lista.innerHTML = "";

      const hoje = new Date();
      demandas.forEach(d =>{

        if(!d.prazo) return;
        const prazo = new Date(d.prazo);

        const diferenca = prazo - hoje;

        const dias = Math.ceil(diferenca/(1000*60*60*24));

        let classe = "";
        let texto = "";

        if (dias<0){

          classe = "alerta-vermelho"
          texto = "ATRASADA"
        }else if(dias<=3){
          classe = "alerta-amarelo"
          texto = `Vence em ${dias} dia(s)`
        }else{
          classe = "alerta-verde"
          texto = `${dias} dias restantes`
        }

        lista.innerHTML += `
      <div class="item-prazo">
        
        <span>${d.titulo}</span>
        
        <span class="${classe}">
          ${texto}
          </span>
          
      </div>`;
      });
    }


    // BLOQUEIO DE ACESSO
    const tipo = localStorage.getItem("tipoUsuario");
    if (tipo !== "admin") {
      window.location.replace("login.html");
    }

    // INICIALIZA
    carregarDashboard();
  </script>
</body>

</html>