// ==========================
// LISTAR CHAMADOS
// ==========================
const lista = document.getElementById("lista");

function carregarChamados() {
    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    lista.innerHTML = "";

    chamados.forEach(c => {
        lista.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.titulo}</td>
                <td>${c.status}</td>
                <td class="prioridade-${c.prioridade?.toLowerCase() || 'baixa'}">${c.prioridade || '-'}</td>
                <td>${c.gut}</td>
                <td>
                    <button class="excluir" onclick="excluirChamado(${c.id})" title="Excluir chamado">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// ==========================
// EXCLUIR CHAMADO
// ==========================
function excluirChamado(id) {
    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    chamados = chamados.filter(c => c.id !== id);
    localStorage.setItem("chamados", JSON.stringify(chamados));
    carregarChamados();
}

// ==========================
// INICIALIZA
// ==========================
carregarChamados();