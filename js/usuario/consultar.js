const nome = document.getElementById("nome")
const email = document.getElementById("email")
const telefone = document.getElementById("telefone")
const cpf = document.getElementById("cpf")
const identidade = document.getElementById("identidade")

const token = sessionStorage.getItem("token")
const emailSession = sessionStorage.getItem("email")

const valores = {
    email: emailSession
}

fetch(`http://localhost:3000/usuario/consultar`,{
    method: "POST",
    headers: { "Content-type":"Application/json",
        "Authorization": `Berear: ${token}`
     },
     body: JSON.stringify(valores)
})
.then(resp => resp.json())
.then(dados =>{
    console.log(dados)

    nome.value = dados.nome
    email.value = dados.email
    telefone.value = dados.telefone
    cpf.value = dados.cpf
    identidade.value = dados.identidade
})
.catch(err =>{
    console.error("Erro ao consultar o usuario: ", err)
})