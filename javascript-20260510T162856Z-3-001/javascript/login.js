// =========================
// LOGIN
// =========================
const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const erro = document.getElementById("erro");

        limparErro();




        // =========================
        // VALIDAÇÃO
        // =========================
        if (!email.includes("@")) {
            mostrarErro("Email inválido");
            return;
        }

        if (senha === "") {
            mostrarErro("Digite a senha");
            return;
        }

        // =========================
        // REGRA ADMIN
        // =========================
        if (email.endsWith("@admin.com")) {
            localStorage.setItem("usuarioLogado", email);
            localStorage.setItem("tipoUsuario", "admin");
            window.location.replace("dashboard.html"); // impede voltar
        } else {
            localStorage.setItem("usuarioLogado", email);
            localStorage.setItem("tipoUsuario", "cliente");
            window.location.replace("cliente.html"); // impede voltar
        }
    });

}

// =========================
// CADASTRO
// =========================
const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", function (event) {

        event.preventDefault()

        const nome = document.getElementById("nome").value.trim()
        const email = document.getElementById("email").value.trim()
        const senha = document.getElementById("senha").value
        const confirmarSenha = document.getElementById("confirmarSenha").value

        limparErro();

         //salvar usuários
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // =========================
        // VALIDAÇÃO
        // =========================

        if (nome.length < 3) {
            mostrarErro("Nome deve ter pelo menos 3 caracteres.")
            return;
        }

        if (!email.includes("@")) {
            mostrarErro("Digite um e-mail válido.")
            return;
        }

        if (senha.length < 4) {
            mostrarErro("Senha deve ter no mínimo 4 caracteres.")
            return;
        }

        if (senha !== confirmarSenha) {
            mostrarErro("As senhas não coincidem.")
            return;
        }

        if (usuarios.find(u => u.email === email)){
            mostrarErro("Email já cadastrado")
            return;
        }

        usuarios.push({ nome, email, senha });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!")

        window.location.href = "login.html"
    }
    );
}


// =========================
// ERRO
// =========================
function mostrarErro(msg) {
    const erro = document.getElementById("erro");
    erro.innerText = msg;
    erro.style.display = "block";
}

function limparErro() {
    const erro = document.getElementById("erro")
    erro.style.display = "none"
    erro.textContent = ""
}

// =========================
// BLOQUEIO VOLTAR
// =========================
if (window.history && window.history.pushState) {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
}

// =========================
// MOSTRAR/OCULTAR SENHA
// =========================
function mostrarSenha() {
    const inputSenha = document.getElementById('senha')
    const btnMostrarSenha = document.getElementById('mostrar-senha')

    if (inputSenha.type === 'password') {
        inputSenha.setAttribute('type', 'text')
        btnMostrarSenha.classList.replace('fa-eye', 'fa-eye-slash')
    }
    else {
        inputSenha.setAttribute('type', 'password')
        btnMostrarSenha.classList.replace('fa-eye-slash', 'fa-eye')
    }
}

function mostrarConfirmarSenha() {
    const inputSenha = document.getElementById('confirmarSenha')
    const btnMostrarSenha = document.getElementById('mostrar-confirmar-senha')

    if (inputSenha.type === 'password') {
        inputSenha.setAttribute('type', 'text')
        btnMostrarSenha.classList.replace('fa-eye', 'fa-eye-slash')
    }
    else {
        inputSenha.setAttribute('type', 'password')
        btnMostrarSenha.classList.replace('fa-eye-slash', 'fa-eye')
    }
}