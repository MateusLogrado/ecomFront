let button = document.getElementById("button")
let res = document.getElementById("res")

button.addEventListener("button", (e)=>{
    e.preventDefault()

    let nomeA = document.getElementById("nome").value
    let descricaoA = document.getElementById("descricao").value
    let nivelPicanciaA = document.getElementById("nivelPicancia").value
    let precoA = document.getElementById("preco").value
    let imagem_urlA = document.getElementById("imagem_url").value
    let ativoA = document.getElementById("ativo").value

    fetch(`http://localhost:3000/produto`)
    .then(resp => resp.json())
    .then(dados =>{
    console.log(dados)

        const produto = dados.find(dad => dad.nome === nomeA.value)

        console.log("Achado: ", produto)

        descricao.value = produto.descricao
        nivelPicancia.value = produto.nivelPicancia
        preco.value = produto.preco
        imagem_url.value = produto.imagem_url
        ativo.value = produto.ativo
})

})