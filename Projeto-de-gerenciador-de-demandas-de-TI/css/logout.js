// =========================
// LOGOUT SEGURO
// =========================
function sair(){
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    window.location.replace("login.html");
}

// BLOQUEIO SETA VOLTAR
if(window.history && window.history.pushState){
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function(){
        window.history.pushState(null, null, window.location.href);
    }
}

// REDIRECIONA se usuário não estiver logado
const usuario = localStorage.getItem("usuarioLogado");
if(!usuario && !window.location.pathname.includes("login.html")){
    window.location.replace("login.html");
}