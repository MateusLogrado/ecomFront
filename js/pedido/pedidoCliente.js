const token = sessionStorage.getItem("token")
const email = sessionStorage.getItem("email")
const listaPedidosElement = document.getElementById("pedidos")

const valor = {
    email: email
}

fetch(`http://localhost:3000/pedido/listar`, {
    method: "POST",
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer: ${token}`
    },
    body: JSON.stringify(valor)
})
.then(resp => resp.json())
.then(listaPedidos => { 

    listaPedidosElement.innerHTML = ""

    if (listaPedidos.length === 0) {
        listaPedidosElement.innerHTML = "<p>Você ainda não fez nenhum pedido.</p>"
        return
    }

    listaPedidos.forEach(pedido => {
        
        const entrega = pedido.entregaPedido
        const itens = pedido.itensPedido

        const divPedido = document.createElement("div")
        
        divPedido.style.border = "1px solid #ddd"
        divPedido.style.marginBottom = "20px"
        divPedido.style.padding = "15px"
        divPedido.style.borderRadius = "8px"
        divPedido.style.backgroundColor = "#fff"
        divPedido.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.1)"

        const dataFormatada = new Date(pedido.dataPedido).toLocaleDateString('pt-BR')

        divPedido.innerHTML = `
            <div>
                <h3>Pedido #${pedido.codPedido}</h3>
                <span>${dataFormatada}</span>
            </div>
            
            <div>
                <div>
                    <p><strong>Status Pedido:</strong> <span>${pedido.status}</span></p>
                    <p><strong>Total:</strong> R$ ${pedido.valorTotal   }</p>
                </div>

                <div>
                    <p><strong>Status Entrega:</strong> 
                        ${entrega ? entrega.statusEntrega : '<span style="color: orange;">Aguardando Envio</span>'}
                    </p>
                    <p><strong>Rastreio:</strong> 
                        ${entrega ? entrega.codigoRastreio : '---'}
                    </p>
                    <p><strong>transportadora:</strong> 
                        ${entrega ? entrega.transportadora : '---'}
                    </p>
                    <p><strong>data estimada:</strong> 
                        ${entrega ? entrega.dataEstimada : '---'}
                    </p>
                    <p><strong>data da entrega:</strong> 
                        ${entrega ? entrega.dataEntrega : '---'}
                    </p>
                </div>
            </div>

            <hr>

            <h4 style="margin-bottom: 10px;">Itens do Pedido:</h4>
            <ul id="lista-itens-${pedido.codPedido}" style="list-style: none; padding: 0;">
                </ul>
        `
        listaPedidosElement.appendChild(divPedido)

        const ulItens = document.getElementById(`lista-itens-${pedido.codPedido}`)

        if (itens && itens.length > 0) {
            itens.forEach(item => {
                const nomeProduto = item.produtoItem ? item.produtoItem.nome : `Produto ID ${item.idProduto}`

                const li = document.createElement("li")
                li.style.padding = "8px 0"
                li.style.borderBottom = "1px solid #f0f0f0"
                li.style.display = "flex"
                li.style.justifyContent = "space-between"

                li.innerHTML = `
                    <span>
                        <strong>${item.quantidade}x</strong> ${nomeProduto}
                    </span>
                    <span>R$ ${item.valorTotalItem}</span>
                `
                ulItens.appendChild(li);
            })
        } else {
            ulItens.innerHTML = "<li style='color: #999; font-style: italic;'>Nenhum item registrado.</li>";
        }
    });

})
.catch(err => {
    console.error("Erro fatal:", err)
    listaPedidosElement.innerHTML = `<p style="color: red;">Ocorreu um erro ao carregar seus pedidos. Tente novamente mais tarde.</p>`
})