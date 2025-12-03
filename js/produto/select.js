let nome = document.getElementById("nome")

fetch(`http://localhost:3000/produto`)
.then(resp => resp.json())
.then(dados =>{
    console.log(dados)

    dados.forEach(dad => {
        const quente = new Option(dad.nome, dad.nome)

        nome.add(quente)
    })
})


let select = document.getElementById("nome")

select.addEventListener("change", (e)=>{
    e.preventDefault()

    let descricao = document.getElementById("descricao")
    let nivelPicancia = document.getElementById("nivelPicancia")
    let preco = document.getElementById("preco")
    let imagem_url = document.getElementById("imagem_url")
    let ativo = document.getElementById("ativo")

    fetch(`http://localhost:3000/produto`)
    .then(resp => resp.json())
    .then(dados =>{
    console.log(dados)

        const produto = dados.find(dad => dad.nome === select.value)

        console.log("Achado: ", produto)

        descricao.value = produto.descricao
        nivelPicancia.value = produto.nivelPicancia
        preco.value = produto.preco
        imagem_url.value = produto.imagem_url
        ativo.value = produto.ativo
})
})