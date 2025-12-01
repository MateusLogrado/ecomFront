let button = document.getElementById("button")
let res = document.getElementById("res")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    let nome = document.getElementById("nome").value
    let email = document.getElementById("email").value
    let telefone = document.getElementById("telefone").value
    let cpf = document.getElementById("cpf").value
    let identidade = document.getElementById("identidade").value

    const token = sessionStorage.getItem("token")

    const valores = {
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        identidade: identidade
    }

    fetch(`http://localhost:3000/usuario`,{
        method: "PUT",
        headers: { "Content-type":"Application/json",
            "Authorization": `Bearer: ${token}`
         },
         body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = dados.message
    })
    .catch(err =>{
        console.error("Erro ao atualizar os usuarios: ", err)
    })
})