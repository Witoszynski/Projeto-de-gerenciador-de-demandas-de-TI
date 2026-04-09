    const formCadastro = document.getElementById("formCadastro")

    formCadastro.addEventListener("submit", function(event){

        event.preventDefault()

        const nome = document.getElementById("nome").value.trim()
        const email = document.getElementById("email").value.trim()
        const senha = document.getElementById("senha").value
        const confirmarSenha = document.getElementById("confirmarSenha").value

        limparErro()

        if(nome.length < 3){
            mostrarErro("Nome deve ter pelo menos 3 caracteres.")
            return
        }

        if(!email.includes("@")){
            mostrarErro("Digite um e-mail válido.")
            return
        }

        if(senha.length < 4){
            mostrarErro("Senha deve ter no mínimo 4 caracteres.")
            return
        }

        if(senha !== confirmarSenha){
            mostrarErro("As senhas não coincidem.")
            return
        }

        // salvar usuário (simulação)
        const usuario = { nome, email, senha }

        localStorage.setItem("usuario", JSON.stringify(usuario))

        alert("Cadastro realizado com sucesso!")

        window.location.href = "login.html"
    })

    function mostrarErro(mensagem){
        const erro = document.getElementById("erro")
        erro.textContent = mensagem
        erro.style.display = "block"
    }

    function limparErro(){
        const erro = document.getElementById("erro")
        erro.style.display = "none"
        erro.textContent = ""
    }
