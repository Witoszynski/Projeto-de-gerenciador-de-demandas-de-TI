// =====================================================
// sync-chamados.js - Sincroniza chamados em tempo real
// =====================================================

console.log("🔄 Carregado: sync-chamados.js");

// Função para recarregar dados em todos os elementos
function sincronizarChamados() {
    console.log("🔄 Sincronizando chamados em tempo real...");

    // Recarregar tabela de chamados (acompanhar.html)
    if (typeof carregarChamados === 'function') {
        carregarChamados();
    }

    // Recarregar botões de chamados (demandas.html)
    if (typeof carregarBotoesChamados === 'function') {
        carregarBotoesChamados();
    }

    // Recarregar tabela de chamados (demandas.html)
    if (typeof carregarTabela === 'function') {
        carregarTabela();
    }

    // Recarregar tabela de chamados (dashboard.html)
    if (typeof carregarTabelaChamados === 'function') {
        carregarTabelaChamados();
    }
}

// Monitorar mudanças no localStorage
window.addEventListener('storage', function(e) {
    if (e.key === 'chamados') {
        console.log("📢 Evento de armazenamento: chamados foram alterados!");
        sincronizarChamados();
    }
});

// Poll automático a cada 1 segundo para garantir sincronização
setInterval(function() {
    // Apenas sincronizar se a página estiver visível
    if (!document.hidden) {
        sincronizarChamados();
    }
}, 1000);

// Sincronizar quando a página voltar do background
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log("📱 Página voltou ao foco. Sincronizando...");
        sincronizarChamados();
    }
});

// Exportar função para uso manual
window.sincronizarChamados = sincronizarChamados;

console.log("✓ sync-chamados.js pronto!");
