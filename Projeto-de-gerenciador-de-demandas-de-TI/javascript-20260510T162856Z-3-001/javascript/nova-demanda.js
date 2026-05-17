const form = document.getElementById("formDemanda")

form.addEventListener("submit", function (e) {

    e.preventDefault()

    //recebe valores inseridos
    const titulo = document.getElementById("titulo").value.trim()
    const descricao = document.getElementById("descricao").value.trim()
    const gravidade = Number(document.getElementById("gravidade").value);
    const urgencia = Number(document.getElementById("urgencia").value);
    const tendencia = Number(document.getElementById("tendencia").value);
    const categoria = document.getElementById("categoria").value
    const prazo = document.getElementById("prazo").value

    //calcula o gut
    const gut = gravidade * urgencia * tendencia;

    //calcula a prioridade
    let prioridade = "";

    if (gut < 30) {
        prioridade = "Baixa";
    }
    else if (gut <= 70) {
        prioridade = "Media"
    }
    else {
        prioridade = "Alta";
    }


    limparErro()

    if (!titulo || !descricao || !gravidade || !urgencia || !tendencia || !categoria || !prazo) {
        mostrarErro("Preencha todos os campos obrigatórios.")
        return
    }

    let demandas = JSON.parse(localStorage.getItem("demandas")) || []

    const novoId = demandas.length > 0
        ? Math.max(...demandas.map(d => d.id)) + 1
        : 1;

    const novaDemanda = {
        id: novoId,
        usuario: localStorage.getItem("usuarioLogado"),
        titulo,
        descricao,
        categoria,
        prazo,
        gravidade,
        urgencia,
        tendencia,
        gut,
        prioridade,
        status: "Pendente"
    }

    demandas.push(novaDemanda)

    localStorage.setItem("demandas", JSON.stringify(demandas))

    alert("Demanda criada com sucesso!")

    window.location.href = "dashboard.html"
})

function mostrarErro(msg) {
    const erro = document.getElementById("erro")
    erro.textContent = msg
    erro.style.display = "block"
}

function limparErro() {
    const erro = document.getElementById("erro")
    erro.style.display = "none"
}

/*form.addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;

    const g = parseInt(document.getElementById("g").value);
    const u = parseInt(document.getElementById("u").value);
    const t = parseInt(document.getElementById("t").value);

    const gut = g * u * t;

    const usuarioLogado = localStorage.getItem("usuarioLogado");

    const id = Date.now();

    const chamado = {
        id,
        titulo,
        descricao,
        categoria,
        gut,
        gravidade: g,
        urgencia: u,
        tendencia: t,
        prioridade: calcularPrioridade(gut),
        status: "Aberto",
        usuario: usuarioLogado // salvar quem criou
    };*/