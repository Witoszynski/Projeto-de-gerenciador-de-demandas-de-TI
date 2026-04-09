// =========================
// LOGIN
// =========================
const form = document.getElementById("formLogin");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const erro = document.getElementById("erro");

    erro.style.display = "none";

    // =========================
    // VALIDAÇÃO
    // =========================
    if(!email.includes("@")){
        mostrarErro("Email inválido");
        return;
    }

    if(senha === ""){
        mostrarErro("Digite a senha");
        return;
    }

    // =========================
    // REGRA ADMIN
    // =========================
    if(email.endsWith("@admin.com")) {
        localStorage.setItem("usuarioLogado", email);
        localStorage.setItem("tipoUsuario", "admin");
        window.location.replace("dashboard.html"); // impede voltar
    } else {
        localStorage.setItem("usuarioLogado", email);
        localStorage.setItem("tipoUsuario", "cliente");
        window.location.replace("cliente.html"); // impede voltar
    }
});

// =========================
// ERRO
// =========================
function mostrarErro(msg){
    const erro = document.getElementById("erro");
    erro.innerText = msg;
    erro.style.display = "block";
}

// =========================
// BLOQUEIO VOLTAR
// =========================
if(window.history && window.history.pushState){
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
}