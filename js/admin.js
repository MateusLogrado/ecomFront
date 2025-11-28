const token = sessionStorage.getItem("token")
const email = sessionStorage.getItem("email")

const valores = {
    email: email
}

fetch(`http://localhost:3000/usuario/consultar`,{
    method: "POST",
    headers: { "Content-type":"Application/json",
        "Authorization": `Bearer: ${token}`
     },
     body: JSON.stringify(valores)
})
.then(resp => resp.json())
.then(dados =>{
    console.log(dados)

    if(dados.tipo_usuario === "CLIENTE"){
        window.location.href = "../../index.html"
    }
})
.catch(err =>{
    console.error("Erro ao consultar o usuario: ", err)
})