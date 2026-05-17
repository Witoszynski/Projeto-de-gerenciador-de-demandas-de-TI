    const form = document.getElementById("formDemanda")

    form.addEventListener("submit", function(e) {

        e.preventDefault()

        const titulo = document.getElementById("titulo").value.trim()
        const descricao = document.getElementById("descricao").value.trim()
        const prioridade = document.getElementById("prioridade").value
        const categoria = document.getElementById("categoria").value
        const prazo = document.getElementById("prazo").value

        limparErro()

        if (!titulo || !descricao || !prioridade || !categoria || !prazo) {
            mostrarErro("Preencha todos os campos obrigatórios.")
            return
        }

        const novaDemanda = {
            titulo,
            descricao,
            prioridade,
            categoria,
            prazo,
            status: "Em andamento"
        }

        let demandas = JSON.parse(localStorage.getItem("demandas")) || []

        demandas.push(novaDemanda)

        localStorage.setItem("demandas", JSON.stringify(demandas))

        alert("Demanda criada com sucesso!")

        window.location.href = "dashboard.html"
    })

    function mostrarErro(msg) {
        const erro = document.getElementById("erro")
        erro.textContent = msg
        erro.style.display = "block"
    }

    function limparErro() {
        const erro = document.getElementById("erro")
        erro.style.display = "none"
    }