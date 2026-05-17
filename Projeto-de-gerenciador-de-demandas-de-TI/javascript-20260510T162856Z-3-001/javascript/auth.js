  async function fazerLogin(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if(!email || !senha){
      alert("Preencha todos os campos!");
      return;
    }

    try {
      // SIMULAÇÃO (trocar pela API de verdade depois)
      if(email === "admin@email.com" && senha === "123"){
        localStorage.setItem("usuario", email);
        window.location.href = "dashboard.html";
      } else {
        throw new Error();
      }

    } catch {
      alert("Login inválido!");
    }
  }