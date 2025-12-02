const finalizar = document.getElementById("finalizar")
const token = sessionStorage.getItem("token")

finalizar.addEventListener("click", (e) => {
    e.preventDefault();

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    fetch(`http://localhost:3000/estoque`)
        .then(resp => resp.json())
        .then(estoque => {
            console.log("Estoque:", estoque)
            console.log("Carrinho:", produtos)

            let subTotal = 0
            let compraValida = true

            produtos.forEach(produtoNoCarrinho => {
                const itemEstoque = estoque.find(item => item.idProduto === Number(produtoNoCarrinho.codProd))

                const qtdeCarrinho = parseInt(produtoNoCarrinho.qtde)
                const precoProduto = parseFloat(produtoNoCarrinho.preco)

                if (!itemEstoque) {
                    console.error(`Produto ID ${produtoNoCarrinho.codProd} não encontrado no estoque!`)
                    compraValida = false;
                } else if (qtdeCarrinho > itemEstoque.quantidade_atual) {
                    console.log(`A quantidade que deseja comprar de ${produtoNoCarrinho.nome} está indisponível no estoque (Disponível: ${itemEstoque.quantidade_atual})`)
                    compraValida = false;
                }

                subTotal += qtdeCarrinho * precoProduto
            })

            if (compraValida && subTotal > 0) {
                console.log("Total calculado:", subTotal)
                finalizarCompra(subTotal)
            } else if (compraValida && subTotal === 0) {
                alert("Seu carrinho está vazio ou com erro de cálculo.")
            }
        })
        .catch(err => console.error("Erro ao buscar estoque", err))
})

function finalizarCompra(valorSubtotal) {
    let idEndereco = document.getElementById("enderecos").value
    let metodoPagamento = document.getElementById("metodoPagamento").value
    let email = sessionStorage.getItem("email")

    const dataAtual = new Date()
    const dia = String(dataAtual.getDate()).padStart(2, '0')
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
    const ano = dataAtual.getFullYear()
    const dataPedido = `${dia}/${mes}/${ano}`

    let frete = Math.random() * (20.0 - 10.0) + 10.0
    let totalComFrete = valorSubtotal + frete

    const valores = {
        idEndereco: idEndereco,
        metodoPagamento: metodoPagamento,
        email: email,
        dataPedido: dataPedido,
        valorFrete: parseFloat(frete.toFixed(2)),
        valorSubtotal: parseFloat(valorSubtotal.toFixed(2)),
        valorTotal: parseFloat(totalComFrete.toFixed(2))
    };

    console.log("Enviando pedido:", valores)

    fetch(`http://localhost:3000/pedido`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer: ${token}`
        },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(pedido => {
        console.log(pedido.codPedido)

        const valoresEntrega = {
            idPedido: pedido.codPedido,
        };

        console.log(valoresEntrega)

        fetch(`http://localhost:3000/entrega`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer: ${token}`
            },
            body: JSON.stringify(valoresEntrega)
        })
        .then(resp => resp.json())
        .then(entrega => {
            let produtos = JSON.parse(localStorage.getItem('produtos')) || []

            fetch(`http://localhost:3000/itemPedido/${pedido.codPedido}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer: ${token}`
                },
                body: JSON.stringify(produtos)
            })
            .then(resp => resp.json())
            .then(itemPedido => {
                
            })
            .catch(err => {
                console.error("Erro ao fazer o item pedido: ", err)
            });
        })
        .catch(err => console.error("Erro com a entrega: ", err))
    })
    .catch(err => {
        console.error("Erro ao fazer o pedido: ", err)
    });
}