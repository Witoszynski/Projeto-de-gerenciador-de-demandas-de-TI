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
}

// ==========================
// CARREGAR TABELA
// ==========================
async function carregarTabela() {
    const lista = await listarChamados();
    const tabela = document.getElementById("tabelaChamados");

    if (!tabela) return;

    if (lista.length === 0) {
        tabela.innerHTML = '<tr><td colspan="4" class="vazio">Nenhum chamado criado ainda</td></tr>';
        return;
    }

    tabela.innerHTML = "";
    lista.forEach(chamado => {
        tabela.innerHTML += `
            <tr onclick="abrirModal({id:'${chamado.id}', titulo:'${chamado.titulo.replace(/'/g, "\\'")}', descricao:'${chamado.descricao.replace(/'/g, "\\'")}', categoria:'${chamado.categoria}', urgencia:'${chamado.urgencia}', status:'${chamado.status}', data:'${chamado.data}'})" style="cursor: pointer;">
                <td>${chamado.titulo}</td>
                <td>${chamado.descricao}</td>
                <td>${chamado.categoria}</td>
                <td>${chamado.urgencia}</td>
            </tr>
        `;
    });
}

// ==========================
// ABRIR MODAL
// ==========================
function abrirModal(chamado) {
    const modal = document.getElementById("modalDetalhes");
    document.getElementById("modalTitulo").textContent = chamado.titulo;
    document.getElementById("modalDescricao").textContent = chamado.descricao;
    document.getElementById("modalCategoria").textContent = chamado.categoria;
    document.getElementById("modalUrgencia").textContent = chamado.urgencia;
    document.getElementById("modalStatus").textContent = chamado.status || "Pendente";
    document.getElementById("modalData").textContent = chamado.data;
    modal.style.display = "block";
}

// ==========================
// FECHAR MODAL
// ==========================
function fecharModal() {
    const modal = document.getElementById("modalDetalhes");
    modal.style.display = "none";
}

// ==========================
// MUDAR ABA
// ==========================
function mostrarAba(nomeAba) {
    const abas = document.querySelectorAll(".tab-content");
    const botoes = document.querySelectorAll(".tab-button");

    abas.forEach(aba => aba.classList.remove("active"));
    botoes.forEach(botao => botao.classList.remove("active"));

    document.getElementById(nomeAba).classList.add("active");
    event.target.classList.add("active");
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
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// INICIALIZA
carregarBotoesChamados();
carregarTabela();