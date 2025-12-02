let produtosCarrinho = JSON.parse(localStorage.getItem('produtos')) || []

function adicionarProduto(botao, input) {
    const nome = botao.dataset.nome
    const preco = Number(botao.dataset.preco)
    const codProd = botao.dataset.id 
    const qtde = Number(input.value)

    if (qtde < 1) {
        alert("Por favor, selecione uma quantidade válida.")
        return
    }

    const itemExistente = produtosCarrinho.find(item => item.codProd === codProd);

    if (itemExistente) {
        itemExistente.qtde += qtde;
    } else {
        produtosCarrinho.push({ nome, preco, codProd, qtde })
    }

    console.log(produtosCarrinho)
    localStorage.setItem('produtos', JSON.stringify(produtosCarrinho))
    alert(`${qtde}x ${nome} adicionado(s) ao carrinho!`)
}

document.addEventListener('click', function(evento) {
    
    const elementoClicado = evento.target;

    if (elementoClicado.classList.contains('adicionar')) {
        
        const botao = elementoClicado;
        const inputQuantidade = botao.previousElementSibling;

        adicionarProduto(botao, inputQuantidade);
    }
});