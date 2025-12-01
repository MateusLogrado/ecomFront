const token = sessionStorage.getItem("token")
const email = sessionStorage.getItem("email")

if(token){
    const valores = {
    email: email
}

fetch(`https://ecomback-production-f02d.up.railway.app/usuario/consultar`,{
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
}else{
    window.location.href = "../../index.html"
}