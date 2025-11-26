let atualizar = document.getElementById("atualizar")
let endereco = document.getElementById("endereco")
let apagar = document.getElementById("apagar")

atualizar.addEventListener("click", ()=>{
    window.location.href = "./atualizar.html"
})

endereco.addEventListener("click", ()=>{
    window.location.href = "../endereco/cadastrar.html"
})

apagar.addEventListener("click", ()=>{
    window.location.href = "./apagar.html"
})