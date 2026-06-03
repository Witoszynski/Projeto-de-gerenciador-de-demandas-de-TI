// ==========================
// LISTAR E GERENCIAR CHAMADOS
// ==========================
async function listarChamados() {
    return JSON.parse(localStorage.getItem("chamados")) || [];
}

async function salvarChamados(lista) {
    localStorage.setItem("chamados", JSON.stringify(lista));
}

// ==========================
// CARREGAR BOTÕES DE CHAMADOS
// ==========================
async function carregarBotoesChamados() {
    const lista = await listarChamados();
    const grid = document.getElementById("chamadosGrid");

    if (!grid) return;

    console.log("Carregando botões de chamados. Total:", lista.length);

    if (lista.length === 0) {
        grid.innerHTML = '<p class="vazio">Nenhum chamado criado ainda</p>';
        return;
    }

    grid.innerHTML = "";
    lista.forEach(chamado => {
        const botao = document.createElement("button");
        botao.className = "botao-chamado";
        botao.textContent = chamado.titulo;
        botao.onclick = () => abrirModal(chamado);
        grid.appendChild(botao);
    });

    console.log("✓ Botões de chamados carregados com sucesso!");
}

// ==========================
// CARREGAR TABELA
// ==========================
async function carregarTabela() {
    const lista = await listarChamados();
    const tabela = document.getElementById("tabelaChamados");

    if (!tabela) return;

    console.log("Carregando tabela de chamados. Total:", lista.length);

    if (lista.length === 0) {
        tabela.innerHTML = '<tr><td colspan="4" class="vazio">Nenhum chamado criado ainda</td></tr>';
        return;
    }

    tabela.innerHTML = "";
    lista.forEach(chamado => {
        const descricaoSegura = chamado.descricao ? chamado.descricao.replace(/'/g, "\\'").replace(/"/g, '\\"') : '';
        const tituloSeguro = chamado.titulo ? chamado.titulo.replace(/'/g, "\\'").replace(/"/g, '\\"') : '';

        tabela.innerHTML += `
            <tr onclick="abrirModal({id:'${chamado.id}', titulo:'${tituloSeguro}', descricao:'${descricaoSegura}', categoria:'${chamado.categoria || ''}', urgencia:'${chamado.urgencia || ''}', status:'${chamado.status || 'Pendente'}', data:'${chamado.data || chamado.dataCriacao || ''}'})" style="cursor: pointer;">
                <td>${chamado.titulo}</td>
                <td>${chamado.descricao || ''}</td>
                <td>${chamado.categoria || ''}</td>
                <td>${chamado.urgencia || chamado.prioridade || ''}</td>
            </tr>
        `;
    });

    console.log("✓ Tabela de chamados carregada com sucesso!");
}

// ==========================
// ABRIR MODAL
// ==========================
function abrirModal(chamado) {
    const modal = document.getElementById("modalDetalhes");
    if (!modal) return;

    document.getElementById("modalTitulo").textContent = chamado.titulo || '';
    document.getElementById("modalDescricao").textContent = chamado.descricao || '';
    document.getElementById("modalCategoria").textContent = chamado.categoria || '';
    document.getElementById("modalUrgencia").textContent = chamado.urgencia || chamado.prioridade || '';
    document.getElementById("modalStatus").textContent = chamado.status || "Pendente";
    document.getElementById("modalData").textContent = chamado.data || chamado.dataCriacao || '';
    modal.style.display = "block";
}

// ==========================
// FECHAR MODAL
// ==========================
function fecharModal() {
    const modal = document.getElementById("modalDetalhes");
    if (modal) {
        modal.style.display = "none";
    }
}

// ==========================
// MUDAR ABA
// ==========================
function mostrarAba(nomeAba) {
    const abas = document.querySelectorAll(".tab-content");
    const botoes = document.querySelectorAll(".tab-button");

    abas.forEach(aba => aba.classList.remove("active"));
    botoes.forEach(botao => botao.classList.remove("active"));

    const abaAtiva = document.getElementById(nomeAba);
    if (abaAtiva) {
        abaAtiva.classList.add("active");
    }

    if (event && event.target) {
        event.target.classList.add("active");
    }
}

// ==========================
// BOTÃO DE SAIR
// ==========================
function sair() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    window.location.replace("login.html");
}

// ==========================
// FECHA MODAL AO CLICAR FORA
// ==========================
window.onclick = function(event) {
    const modal = document.getElementById("modalDetalhes");
    if (modal && event.target === modal) {
        modal.style.display = "none";
    }
}

// ==========================
// MONITORAR MUDANÇAS EM TEMPO REAL
// ==========================
window.addEventListener('storage', function(e) {
    if (e.key === 'chamados') {
        console.log("🔔 Mudança detectada em chamados! Atualizando interface...");
        carregarBotoesChamados();
        carregarTabela();
    }
});

// Poll a cada 2 segundos para atualizar automaticamente
setInterval(function() {
    if (document.getElementById("chamadosGrid") || document.getElementById("tabelaChamados")) {
        carregarBotoesChamados();
        carregarTabela();
    }
}, 2000);

// INICIALIZA
console.log("Inicializando demandas.js...");
carregarBotoesChamados();
carregarTabela();
console.log("✓ demandas.js inicializado!");
