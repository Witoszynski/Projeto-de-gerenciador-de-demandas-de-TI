  const API_URL = "http://localhost:8080/api";

  /* LISTAR DEMANDAS */
  async function listarDemandas(){
    const dados = localStorage.getItem("demandas");
    return dados ? JSON.parse(dados) : [];
  }

  /* SALVAR */
  async function salvarDemandas(lista){
    localStorage.setItem("demandas", JSON.stringify(lista));
  }