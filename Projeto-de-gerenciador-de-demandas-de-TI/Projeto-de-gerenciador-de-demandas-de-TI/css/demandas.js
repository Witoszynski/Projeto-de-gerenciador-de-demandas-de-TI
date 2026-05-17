// ==========================
// LISTAR E GERENCIAR DEMANDAS
// =========================
async function listarDemandas(){
    return JSON.parse(localStorage.getItem("demandas")) || [];
}

async function salvarDemandas(lista){
    localStorage.setItem("demandas", JSON.stringify(lista));
}

// ==========================
// CARREGAR TABELA
// =========================
async function carregarTabela(){
    const lista = await listarDemandas();
    const tabela = document.getElementById("tabelaDemandas");
    if(!tabela) return;

    const filtro = document.getElementById("filtroPrioridade")?.value;
    tabela.innerHTML = "";

    const filtradas = lista.filter(d => {
        if(!filtro) return true;
        return d.prioridade === filtro;
    });

    filtradas.forEach(d => {
        tabela.innerHTML += `
            <tr>
                <td>${d.id}</td>
                <td>${d.titulo}</td>
                <td>${d.descricao || "-"}</td>
                <td>${d.categoria}</td>
                <td class="gut">${d.gut}</td>
                <td class="prioridade-${d.prioridade.toLowerCase()}">${d.prioridade}</td>
                <td style="text-align:center;">
                    <select onchange="mudarStatus(${d.id}, this.value)">
                        <option ${d.status==="Pendente"?"selected":""}>Pendente</option>
                        <option ${d.status==="Em andamento"?"selected":""}>Em andamento</option>
                        <option ${d.status==="Concluído"?"selected":""}>Concluído</option>
                    </select>
                </td>
                <td>${d.data || new Date().toLocaleDateString()}</td>
                <td style="text-align:center;">
                    <button class="botao-excluir" onclick="excluirDemanda(${d.id})"></button>
                </td>
            </tr>
        `;
    });
}

// ==========================
// MUDAR STATUS
// =========================
async function mudarStatus(id, status){
    const lista = await listarDemandas();
    const item = lista.find(d => d.id === id);
    if(item){
        item.status = status;
        await salvarDemandas(lista);
        carregarTabela();
    }
}

// ==========================
// EXCLUIR DEMANDA
// =========================
async function excluirDemanda(id){
    let lista = await listarDemandas();
    lista = lista.filter(d => d.id !== id);
    await salvarDemandas(lista);
    carregarTabela();
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