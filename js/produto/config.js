let cadastrar = document.getElementById("cadastrar")
let atualizar = document.getElementById("atualizar")
let estoque = document.getElementById("estoque")
let apagar = document.getElementById("apagar")

cadastrar.addEventListener("click", ()=>{
    window.location.href = "./cadastrar.html"
})

atualizar.addEventListener("click", ()=>{
    window.location.href = ".atualizar.html"
})

estoque.addEventListener("click", ()=>{
    window.location.href = "./estoque.html"
})

apagar.addEventListener("click", ()=>{
    window.location.href = "./apagar.html"
})