const form = document.getElementById("formCliente");

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
        prioridade = "Média"
    }
    else {
        prioridade = "Alta";
    }


    limparErro()

    if (!titulo || !descricao || !gravidade || !urgencia || !tendencia || !categoria || !prazo) {
        mostrarErro("Preencha todos os campos obrigatórios.")
        return
    }

    let chamados = JSON.parse(localStorage.getItem("chamados")) || []

    const novoId = chamados.length > 0
        ? Math.max(...chamados.map(d => d.id)) + 1
        : 1;

    const chamado = {
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

    chamados.push(chamado);
    localStorage.setItem("chamados", JSON.stringify(chamados));

    alert("Chamado criado! ID: " + novoId);

    form.reset();
});

function mostrarErro(msg) {
    const erro = document.getElementById("erro")
    erro.textContent = msg
    erro.style.display = "block"
}

function limparErro() {
    const erro = document.getElementById("erro")
    erro.style.display = "none"
}

function sair() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    window.location.replace("login.html");
}

function irAcompanhar() {
    window.location.href = "acompanhar.html";
}