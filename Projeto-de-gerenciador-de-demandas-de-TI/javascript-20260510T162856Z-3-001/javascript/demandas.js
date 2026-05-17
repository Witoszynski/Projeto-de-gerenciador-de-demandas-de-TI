// ==========================
// LISTAR E GERENCIAR DEMANDAS
// =========================
async function listarDemandas() {
    return JSON.parse(localStorage.getItem("demandas")) || [];
}

async function salvarDemandas(lista) {
    localStorage.setItem("demandas", JSON.stringify(lista));
}

// ==========================
// CARREGAR TABELA
// =========================
async function carregarTabela() {
    const lista = await listarDemandas();
    const tabela = document.getElementById("tabelaDemandas");
    if (!tabela) return;


    // ==========================
    // FILTRAR TABELA
    // =========================
    const pesquisa = document.getElementById("barraPesquisa")?.value.toLowerCase() || "";

    const filtroCategoria = document.getElementById("filtroCategoria")?.value;

    const filtroPrioridade = document.getElementById("filtroPrioridade")?.value;

    const filtroStatus = document.getElementById("filtroStatus")?.value;
    tabela.innerHTML = "";

    const filtradas = lista.filter(d => {

        const filtroPesquisa = d.titulo.toLowerCase().includes(pesquisa);

        const filtroCategoriaAtivo = !filtroCategoria || d.categoria === filtroCategoria;

        const filtroPrioridadeAtivo = !filtroPrioridade || d.prioridade === filtroPrioridade;

        const filtroStatusAtivo = !filtroStatus || d.status === filtroStatus;

        return filtroPesquisa && filtroCategoriaAtivo && filtroStatusAtivo && filtroPrioridadeAtivo;
    });

    filtradas.forEach(d => {
        tabela.innerHTML += `
            <tr>
                <td>
                    <input type="checkbox" class="check-demanda" value="${d.id}">
                </td>
                <td>${d.id}</td>
                <td>${d.usuario || "-"}</td>
                <td>${d.titulo}</td>
                <td>${d.descricao || "-"}</td>
                <td>${d.categoria}</td>
                <td class="prioridade-${d.prioridade.toLowerCase()}">${d.prioridade}</td>
                <td>${d.status}</td>
                <td>
                ${new Date(d.prazo).toLocaleDateString("pt-BR")}
                </td>
                <td style="text-align:center;">
                    <button class="botao-excluir" onclick="excluirDemanda(${d.id})"></button>
                </td>
            </tr>
        `;
    });
}

// ==========================
// PEGAR OS IDS SELECIONADOS
// =========================
function obterSelecionadas(){
    const checks = document.querySelectorAll(".check-demanda:checked");

    return Array.from(checks).map(c => Number(c.value));
}

// ==========================
// SELECIONAR TODAS
// =========================
function selecionarTodas(master){
    const checks = document.querySelectorAll(".check-demanda");

    checks.forEach(c => {
        c.checked = master.checked;
    });
}

// ==========================
// MUDAR STATUS
// =========================
async function mudarStatus(id, status) {
    const lista = await listarDemandas();
    const item = lista.find(d => d.id === id);
    if (item) {
        item.status = status;
        await salvarDemandas(lista);
        carregarTabela();
    }
}

// ==========================
// ALTERAR STATUS EM MASSA
// ==========================
async function alterarStatusLote(novoStatus){

    const ids = obterSelecionadas();

    let lista = await listarDemandas();

    lista.forEach(d => {

        if(ids.includes(d.id)){
            d.status = novoStatus;
        }

    });

    await salvarDemandas(lista);

    carregarTabela();
}

// ==========================
// EXCLUIR DEMANDA
// =========================
async function excluirDemanda(id) {
    let lista = await listarDemandas();
    lista = lista.filter(d => d.id !== id);
    await salvarDemandas(lista);
    carregarTabela();
}

// ==========================
// EXCLUIR SELECIONADAS
// ==========================
async function excluirSelecionadas(){

    const ids = obterSelecionadas();

    let lista = await listarDemandas();

    lista = lista.filter(d => !ids.includes(d.id));

    await salvarDemandas(lista);

    carregarTabela();
}

// ==========================
// BOTÃO DE SAIR
// =========================
function sair() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    window.location.replace("login.html");
}

// ==========================
// ABRIR POPUP
// =========================
function abrirPopup(){
    document.getElementById("overlay").style.display = "flex";
}

function fecharPopup(){
    document.getElementById("overlay").style.display = "none";
}

// INICIALIZA
carregarTabela();