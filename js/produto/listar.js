let produtos = document.getElementById("produtos")

fetch(`http://localhost:3000/produto`, {
    method: "GET",
    headers: { "content-type":"application/json",
        "Authorization": `Bearer: ${token}`
     }
    })
.then(resp => resp.json())
.then(produto =>{
    fetch(`http://localhost:3000/estoque`)
    .then(resp => resp.json())
    .then(estoque =>{

        console.log("Produtos: ", produto)
        console.log("Estoque: ", estoque)

        produto.forEach(dad => {
            const estoques = estoque.find(estoque => estoque.idProduto === dad.codProduto)

            produtos.innerHTML += `<div class="produto-card">
    <img src="${dad.imagem_url}" alt="${dad.nome}">
    <h3>${dad.nome}</h3>
    <p>${dad.descricao}</p>
    <p>Nivel de picância: ${dad.nivelPicancia}</p>
    <p>preço: ${dad.preco}</p>
    <p>quantidade disponivel: ${estoques.quantidade_atual}</p>
    <div class="acoes">
        <input type="number" value="1" min="1" class="quant">
        
        <button class="adicionar" data-id="${dad.codProduto}" data-nome="${dad.nome}" data-preco="${dad.preco}">Adicionar</button>
    </div>
</div>`
        })
    })
    .catch(err =>{
        console.log("Erro ao listar o estoque: ", err)
    })
})
.catch(err =>{
    console.log("Erro ao listar os produtos: ", err)
})