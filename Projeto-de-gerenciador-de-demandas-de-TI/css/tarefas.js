// ==========================
// LISTAR E GERENCIAR TAREFAS
// =========================
async function listarTarefas(){
    return JSON.parse(localStorage.getItem("demandas")) || [];
}

async function salvarTarefas(lista){
    localStorage.setItem("demandas", JSON.stringify(lista));
}

// ==========================
// MODAL
// =========================
function abrirModal(){
    document.getElementById("modalNovaTarefa").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function fecharModal(){
    document.getElementById("modalNovaTarefa").style.display = "none";
    document.getElementById("formTarefa").reset();
    limparErro();
    document.body.style.overflow = "auto";
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById("modalNovaTarefa");
    if (event.target === modal) {
        fecharModal();
    }
}

// ==========================
// CARREGAR TABELA
// =========================
async function carregarTabela(){
    const lista = await listarTarefas();
    const tabela = document.getElementById("tabelaTarefas");
    if(!tabela) return;

    const filtro = document.getElementById("filtroPrioridade")?.value;
    tabela.innerHTML = "";

    const filtradas = lista.filter(d => {
        if(!filtro) return true;
        return d.prioridade === filtro;
    });

    filtradas.forEach((d, idx) => {
        const prazoFormatado = d.prazo ? new Date(d.prazo).toLocaleDateString() : "-";
        tabela.innerHTML += `
            <tr>
                <td>${idx + 1}</td>
                <td>${d.titulo}</td>
                <td>${d.descricao || "-"}</td>
                <td>${d.categoria}</td>
                <td class="prioridade-${d.prioridade.toLowerCase()}">${d.prioridade}</td>
                <td>${prazoFormatado}</td>
                <td style="text-align:center;">
                    <select onchange="mudarStatus(${idx}, this.value)">
                        <option ${d.status==="Pendente"?"selected":""}>Pendente</option>
                        <option ${d.status==="Em andamento"?"selected":""}>Em andamento</option>
                        <option ${d.status==="Concluído"?"selected":""}>Concluído</option>
                    </select>
                </td>
                <td>${d.data || new Date().toLocaleDateString()}</td>
                <td style="text-align:center;">
                    <button class="botao-excluir" onclick="excluirTarefa(${idx})"></button>
                </td>
            </tr>
        `;
    });
}

// ==========================
// MUDAR STATUS
// =========================
async function mudarStatus(idx, status){
    const lista = await listarTarefas();
    if(lista[idx]){
        lista[idx].status = status;
        await salvarTarefas(lista);
        carregarTabela();
    }
}

// ==========================
// EXCLUIR TAREFA
// =========================
async function excluirTarefa(idx){
    if(!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

    let lista = await listarTarefas();
    lista.splice(idx, 1);
    await salvarTarefas(lista);
    carregarTabela();
}

// ==========================
// FORMULÁRIO - SALVAR NOVA TAREFA
// =========================
document.getElementById("formTarefa").addEventListener("submit", async function(e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    const categoria = document.getElementById("categoria").value;
    const impacto = document.getElementById("impacto").value;
    const evolucao = document.getElementById("evolucao").value;
    const prazo = document.getElementById("prazo").value;

    limparErro();

    if (!titulo || !descricao || !prioridade || !categoria || !impacto || !evolucao || !prazo) {
        mostrarErro("Preencha todos os campos obrigatórios.");
        return;
    }

    const novaTarefa = {
        titulo,
        descricao,
        prioridade,
        categoria,
        impacto,
        evolucao,
        prazo,
        status: "Pendente",
        data: new Date().toLocaleDateString()
    };

    let tarefas = await listarTarefas();
    tarefas.push(novaTarefa);
    await salvarTarefas(tarefas);

    fecharModal();
    carregarTabela();
});

function mostrarErro(msg) {
    const erro = document.getElementById("erro");
    erro.textContent = msg;
    erro.style.display = "block";
}

function limparErro() {
    const erro = document.getElementById("erro");
    erro.style.display = "none";
}

// ==========================
// BOTÃO DE SAIR
// =========================
function sair(){
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    window.location.replace("login.html");
}

// INICIALIZA
carregarTabela();
