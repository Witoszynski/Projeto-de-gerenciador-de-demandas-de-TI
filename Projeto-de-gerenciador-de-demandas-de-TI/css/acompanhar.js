console.log("acompanhar.js carregado");

const lista = document.getElementById("lista");

function carregarChamados() {
    console.log("=== CARREGANDO CHAMADOS ===");

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    console.log("✓ Total de chamados no localStorage:", chamados.length);
    console.log("Todos os chamados:", JSON.stringify(chamados, null, 2));

    if (chamados.length > 0) {
        console.log("Chamados encontrados:", chamados);
    }

    lista.innerHTML = "";

    if (chamados.length === 0) {
        console.log("Nenhum chamado encontrado");
        lista.innerHTML = `
            <tr class="linha-vazia">
                <td colspan="7" style="text-align: center; padding: 60px 20px;">
                    <div style="color: #94a3b8;">
                        <div style="font-size: 48px; margin-bottom: 10px;">📋</div>
                        <strong>Nenhum chamado encontrado</strong><br>
                        <small>Clique em "Voltar" e crie um novo chamado</small>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    chamados.forEach((c, index) => {
        console.log(`Renderizando chamado ${index + 1}:`, c);

        // Usar estrutura correta do chamado
        const id = c.id || index;
        const titulo = c.titulo || "Sem título";
        const status = c.status || "Pendente";
        const prioridade = c.prioridade || "Baixa";
        const gut = c.gut || 0;
        const dataCriacao = c.dataCriacao || new Date().toLocaleString();

        const classeStatus = `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
        const classePrioridade = `prioridade-${prioridade.toLowerCase().replace(/\s+/g, '-')}`;

        lista.innerHTML += `
            <tr class="linha-chamado">
                <td class="coluna-id"><strong>#${id}</strong></td>
                <td class="coluna-titulo"><strong>${titulo}</strong></td>
                <td class="coluna-status">
                    <span class="badge ${classeStatus}">${status}</span>
                </td>
                <td class="coluna-prioridade">
                    <span class="badge ${classePrioridade}">${prioridade}</span>
                </td>
                <td class="coluna-gut">${gut}</td>
                <td class="coluna-data">${dataCriacao}</td>
                <td class="coluna-acoes">
                    <button class="btn-excluir" onclick="excluirChamado(${id})" title="Excluir chamado">🗑️</button>
                </td>
            </tr>
        `;
    });

    console.log("✓ Chamados renderizados com sucesso!");
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

function recarregarChamados() {
    console.log("Recarregando chamados manualmente...");
    carregarChamados();
}

function sair() {
    if (confirm("Tem certeza que deseja sair?")) {
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("tipoUsuario");
        window.location.href = "login.html";
    }
}

// Inicializar página de acompanhamento
console.log("Inicializando página de acompanhamento...");
carregarChamados();

// Monitora mudanças no localStorage
window.addEventListener('storage', function(e) {
    if (e.key === 'chamados') {
        console.log("Mudança detectada em chamados!");
        carregarChamados();
    }
});

// Poll a cada 2 segundos para verificar novos chamados
setInterval(function() {
    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    console.log("Poll - Total de chamados:", chamados.length);
}, 2000);
