let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    let nome = document.getElementById("nome").value
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    let telefone = document.getElementById("telefone").value
    let cpf = document.getElementById("cpf").value
    let identidade = document.getElementById("identidade").value

    const valores = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        cpf: cpf,
        identidade: identidade
    }

    fetch(`http://localhost:3000/usuario`, {
        method: "POST",
        headers: { "content-type":"application/json" },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = dados.message  
        
        if(dados.cadastrou === true){
            setTimeout(()=>{
                window.location.href = "./login.html"
            }, 2000)
        }
    })
    .catch(err =>{
        console.error("Erro ao cadastrar o usuario: ", err)
    })
})