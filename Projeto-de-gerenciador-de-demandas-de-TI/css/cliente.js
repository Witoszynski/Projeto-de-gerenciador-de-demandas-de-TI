// Debug: verificar se arquivo foi carregado
console.log("cliente.js carregado");

// Aguardar elemento estar pronto
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM carregado");

    const form = document.getElementById("formCliente");
    console.log("Formulário encontrado:", form ? "SIM" : "NÃO");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("=== FORMULÁRIO SUBMETIDO ===");

            const titulo = document.getElementById("titulo").value.trim();
            const descricao = document.getElementById("descricao").value.trim();
            const categoria = document.getElementById("categoria").value;

            console.log("Título:", titulo);
            console.log("Descrição:", descricao);
            console.log("Categoria:", categoria);

            if (!titulo || !descricao) {
                alert("Por favor, preencha Título e Descrição!");
                return;
            }

            const g = parseInt(document.getElementById("g").value);
            const u = parseInt(document.getElementById("u").value);
            const t = parseInt(document.getElementById("t").value);
            const gut = g * u * t;

            const usuarioLogado = localStorage.getItem("usuarioLogado");
            console.log("Usuário logado:", usuarioLogado);

            if (!usuarioLogado) {
                alert("Você não está logado!");
                return;
            }

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
                usuario: usuarioLogado,
                dataCriacao: new Date().toLocaleString()
            };

            let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
            chamados.push(chamado);
            localStorage.setItem("chamados", JSON.stringify(chamados));

            console.log("✓ Chamado salvo com sucesso!");
            console.log("Chamado:", chamado);
            console.log("Total na lista:", chamados.length);

            alert("✓ Chamado criado com sucesso!\nID: " + id + "\n\nVocê pode ver em 'Meus Chamados'");
            form.reset();
        });
    } else {
        console.error("❌ ERRO: Formulário não encontrado!");
    }
});

function calcularPrioridade(gut) {
    if (gut >= 100) return "Alta";
    if (gut >= 50) return "Média";
    return "Baixa";
}

function sair() {
    if (confirm("Tem certeza que deseja sair?")) {
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("tipoUsuario");
        window.location.href = "login.html";
    }
}

function irAcompanhar() {
    window.location.href = "acompanhar.html";
}