function gerarID() {
    return `CHAMADO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function mostrarErro(msg) {
    const erro = document.getElementById("erro");
    if (erro) {
        erro.textContent = msg;
        erro.style.display = "block";
    }
}

function limparErro() {
    const erro = document.getElementById("erro");
    if (erro) {
        erro.style.display = "none";
    }
}

const form = document.getElementById("formSolicitacao");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const titulo = document.getElementById("titulo").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const categoria = document.getElementById("categoria").value;
        const urgencia = document.getElementById("urgencia").value;

        limparErro();

        if (!titulo || !descricao || !categoria || !urgencia) {
            mostrarErro("Preencha todos os campos obrigatórios.");
            return;
        }

        const novaChamado = {
            id: gerarID(),
            titulo,
            descricao,
            categoria,
            urgencia,
            status: "Pendente",
            data: new Date().toLocaleDateString()
        };

        let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
        chamados.push(novaChamado);
        localStorage.setItem("chamados", JSON.stringify(chamados));

        alert("Chamado criado com sucesso!");
        window.location.href = "demandas.html";
    });
}