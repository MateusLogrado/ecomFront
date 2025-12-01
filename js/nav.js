let nav = document.getElementById("nav")
const token = sessionStorage.getItem("token")

const emailSession = sessionStorage.getItem("email")

const valores = {
    email: emailSession
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

    if(dados.tipo_usuario === "ADMIN"){
        nav.innerHTML += `<a href="./html/produto/config.html">Produto</a>`
    }

    if(!token){
    nav.innerHTML = `<a href="./html/usuario/cadastrar.html">Cadastrar</a> <a href="./html/usuario/login.html">Login</a>`
}else{
    nav.innerHTML += `<a href="./html/usuario/config.html">Configuração</a>`
    nav.innerHTML += `<a href="./carrinho.html">Carrinho</a>`
    nav.innerHTML += `<button id="deslogar">deslogar</button>`
}

let deslogar = document.getElementById("deslogar")

deslogar.addEventListener("click", (e)=>{
    e.preventDefault()

    sessionStorage.clear()

    window.location.href = "./index.html"
})  

})
.catch(err =>{
    console.error("Erro ao consultar o usuario: ", err)
})

