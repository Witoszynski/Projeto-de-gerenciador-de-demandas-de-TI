console.log("acompanhar.js carregado");

const lista = document.getElementById("lista");

function carregarChamados() {
    console.log("=== CARREGANDO CHAMADOS ===");

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    console.log("✓ Total de chamados no localStorage:", chamados.length);

    if (chamados.length > 0) {
        console.log("Chamados encontrados:", chamados);
    }

    lista.innerHTML = "";

    if (chamados.length === 0) {
        console.log("Nenhum chamado encontrado");
        lista.innerHTML = `
            <tr style="background-color: #f5f5f5;">
                <td colspan="6" style="text-align: center; padding: 30px; color: #666;">
                    <strong>Nenhum chamado encontrado</strong><br>
                    <small>Clique em "Voltar" e crie um novo chamado</small>
                </td>
            </tr>
        `;
        return;
    }

    chamados.forEach((c, index) => {
        console.log(`Renderizando chamado ${index + 1}:`, c.titulo);
        lista.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td><strong>${c.titulo}</strong></td>
                <td>${c.status}</td>
                <td style="color: ${getPrioridadeColor(c.prioridade)}; font-weight: bold;">
                    ${c.prioridade || '-'}
                </td>
                <td>${c.gut}</td>
                <td style="text-align: center;">
                    <button class="excluir" onclick="excluirChamado(${c.id})" title="Excluir chamado">🗑️</button>
                </td>
            </tr>
        `;
    });
}

function getPrioridadeColor(prioridade) {
    if (prioridade === "Alta") return "#dc2626";
    if (prioridade === "Média") return "#f59e0b";
    return "#16a34a";
}

function excluirChamado(id) {
    if (!confirm("Tem certeza que deseja excluir este chamado?")) {
        return;
    }
    console.log("Excluindo chamado ID:", id);

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    chamados = chamados.filter(c => c.id !== id);
    localStorage.setItem("chamados", JSON.stringify(chamados));

    console.log("✓ Chamado excluído. Restante:", chamados.length);
    carregarChamados();
}

function voltar(){
    window.location.href = "cliente.html";
}

function sair() {
    if (confirm("Tem certeza que deseja sair?")) {
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("tipoUsuario");
        window.location.href = "login.html";
    }
}

console.log("Inicializando página de acompanhamento...");
carregarChamados();