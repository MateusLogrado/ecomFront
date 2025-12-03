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
.catch(err =>{
    console.log("Erro no select do atualizar estoque: ", err)
})


let select = document.getElementById("nome")

select.addEventListener("change", (e)=>{
    e.preventDefault()

    let quantidade_atual = document.getElementById("quantidade_atual")
    let quantidade_minima = document.getElementById("quantidade_minima")

    fetch(`http://localhost:3000/produto`)
    .then(resp => resp.json())
    .then(produtos =>{

        const produto = produtos.find(dad => dad.nome === select.value)

            fetch(`http://localhost:3000/estoque`)
    .then(resp => resp.json())
    .then(dados =>{
    console.log(dados)

        const estoque = dados.find(dad => dad.idProduto === produto.codProduto)

        console.log(estoque)

        console.log("Achado: ", produto)

        quantidade_atual.value = estoque.quantidade_atual
        quantidade_minima.value = estoque.quantidade_minima
})
.catch(err =>{
    console.error("Erro no estoque do atualizar estoque: ", err)
})
    })
    .catch(err =>{
        console.error("Erro no produto do atualizar estoque: ", err)
    })
})