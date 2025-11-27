let nav = document.getElementById("nav")
const token = sessionStorage.getItem("token")

if(!token){
    nav.innerHTML = `<a href="./html/usuario/cadastrar.html">Cadastrar</a> <a href="./html/usuario/login.html">Login</a>`
}else{
    nav.innerHTML = `<a href="./html/usuario/config.html">Configuração</a>`
    nav.innerHTML += `<button id="deslogar">deslogar</button>`
}