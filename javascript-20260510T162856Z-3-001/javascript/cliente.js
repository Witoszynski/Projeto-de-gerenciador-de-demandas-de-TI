const form = document.getElementById("formCliente");

form.addEventListener("submit", function(e){
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
    };

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    chamados.push(chamado);
    localStorage.setItem("chamados", JSON.stringify(chamados));

    alert("Chamado criado! ID: " + id);

    form.reset();
});

function calcularPrioridade(gut){
    if(gut >= 100) return "Alta";
    if(gut >= 50) return "Média";
    return "Baixa";
}

function sair(){
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    window.location.replace("login.html");
}

function irAcompanhar(){
    window.location.href = "acompanhar.html";
}