const containerPedidos = document.getElementById("pedidos")


containerPedidos.addEventListener("click", (event) => {
    
    if (event.target && event.target.classList.contains("btn-salvar")) {
        event.preventDefault()

        const botao = event.target
        const idPedido = botao.getAttribute("data-id")
        const token = sessionStorage.getItem("token")

        const statusPedidoVal = document.getElementById(`status-pedido-${idPedido}`).value
        
        const statusEntregaVal = document.getElementById(`status-entrega-${idPedido}`).value
        const rastreioVal = document.getElementById(`rastreio-${idPedido}`).value
        const transpVal = document.getElementById(`transp-${idPedido}`).value
        const dataEstVal = document.getElementById(`data-est-${idPedido}`).value
        const dataEntVal = document.getElementById(`data-ent-${idPedido}`).value

        const valoresPedido = {
                codPedido: idPedido,
                status: statusPedidoVal
            }

        fetch("http://localhost:3000/pedido", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(valoresPedido)
        })
        .then(respPedido => respPedido.json())
        .then(dadosPedido => {
            console.log("Pedido atualizado. Iniciando atualização da entrega...")

            
            const valoresEntrega = {
                    idPedido: idPedido,
                    statusEntrega: statusEntregaVal,
                    codigoRastreio: rastreioVal,
                    transportadora: transpVal,
                    dataEstimada: dataEstVal,
                    dataEntrega: dataEntVal
            }

            fetch("http://localhost:3000/entrega", {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(valoresEntrega)
            })
            .then(respEntrega => respEntrega.json())
            .then(dadosEntrega => {
                alert("Sucesso! Pedido e Entrega foram atualizados.")
                
                botao.innerText = "Salvar Alterações"
                botao.disabled = false
                botao.style.backgroundColor = "#28a745"
            })
            .catch(errEntrega => {
                console.error(errEntrega)
            })

        })
        .catch(errPedido => {
            console.error(errPedido)
        })
    }
})