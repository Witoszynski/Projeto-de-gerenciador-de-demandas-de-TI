    const form = document.getElementById("formTarefa")

    if(form) {
        form.addEventListener("submit", function(e) {

            e.preventDefault()

            const titulo = document.getElementById("titulo").value.trim()
            const descricao = document.getElementById("descricao").value.trim()
            const prioridade = document.getElementById("prioridade").value
            const categoria = document.getElementById("categoria").value
            const impacto = document.getElementById("impacto").value
            const evolucao = document.getElementById("evolucao").value
            const prazo = document.getElementById("prazo").value

            limparErro()

            if (!titulo || !descricao || !prioridade || !categoria || !impacto || !evolucao || !prazo) {
                mostrarErro("Preencha todos os campos obrigatórios.")
                return
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
            }

            let tarefas = JSON.parse(localStorage.getItem("demandas")) || []

            tarefas.push(novaTarefa)

            localStorage.setItem("demandas", JSON.stringify(tarefas))

            alert("Tarefa criada com sucesso!")

            window.location.href = "tarefas.html"
        })
    }

    function mostrarErro(msg) {
        const erro = document.getElementById("erro")
        erro.textContent = msg
        erro.style.display = "block"
    }

    function limparErro() {
        const erro = document.getElementById("erro")
        erro.style.display = "none"
    }