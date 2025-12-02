const selectUsuarios = document.getElementById("usuarios")
const listaPedidosElement = document.getElementById("pedidos")
const token = sessionStorage.getItem("token")

fetch("http://localhost:3000/usuario", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
.then(resp => resp.json())
.then(usuarios => {
    const optionDefault = new Option("Selecione um usuário", "")
    optionDefault.disabled = true
    optionDefault.selected = true
    selectUsuarios.add(optionDefault)

    usuarios.forEach(user => {
        const label = `${user.nome} (${user.tipo_usuario})`
        const option = new Option(label, user.email)
        selectUsuarios.add(option)
    })
})
.catch(err => console.log("Erro ao carregar usuários:", err))

selectUsuarios.addEventListener("change", (e) => {
    e.preventDefault()

    const emailSelecionado = selectUsuarios.value

    const valor = {
        email: emailSelecionado
    }

    fetch("http://localhost:3000/pedido/listar", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(valor)
    })
    .then(resp => resp.json())
    .then(listaPedidos => {
        listaPedidosElement.innerHTML = ""

        if (listaPedidos.length === 0) {
            listaPedidosElement.innerHTML = "<p style='text-align:center; padding: 20px;'>Sem pedidos para este usuário.</p>"
            return
        }


        listaPedidos.forEach(pedido => {
            const entrega = pedido.entregaPedido || {} 
            const itens = pedido.itensPedido
            const divPedido = document.createElement("div")
            
            divPedido.className = "pedido-card"

            const dataFormatada = new Date(pedido.dataPedido).toLocaleDateString("pt-BR")
            
            const formatDataInput = (data) => {
                if(!data) return ""
                return data.split("T")[0]
            }

            divPedido.innerHTML = `
                <div class="pedido-header">
                    <h3>Pedido #${pedido.codPedido}</h3>
                    <span>Data: ${dataFormatada}</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    
                    <div style="background: #fdfdfd; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
                        <h4 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">
                            Dados do Pedido
                        </h4>
                        
                        <label>Status do Pedido:</label>
                        <select id="status-pedido-${pedido.codPedido}" style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px;">
                            <option value="PENDENTE_PAGAMENTO" ${pedido.status === 'PENDENTE_PAGAMENTO' ? 'selected' : ''}>Pendente Pagamento</option>
                            <option value="PROCESSANDO_PAGAMENTO" ${pedido.status === 'PROCESSANDO_PAGAMENTO' ? 'selected' : ''}>Processando Pagamento</option>
                            <option value="PAGO" ${pedido.status === 'PAGO' ? 'selected' : ''}>Pago</option>
                            <option value="SEPARACAO_ESTOQUE" ${pedido.status === 'SEPARACAO_ESTOQUE' ? 'selected' : ''}>Separação Estoque</option>
                            <option value="ENVIADO" ${pedido.status === 'ENVIADO' ? 'selected' : ''}>Enviado</option>
                            <option value="ENTREGUE" ${pedido.status === 'ENTREGUE' ? 'selected' : ''}>Entregue</option>
                            <option value="CANCELADO" ${pedido.status === 'CANCELADO' ? 'selected' : ''}>Cancelado</option>
                        </select>
                        
                        <p style="font-size: 1.1rem; color: #333;"><strong>Total:</strong> R$ ${pedido.valorTotal}</p>
                    </div>

                    <div style="background: #fdfdfd; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
                        <h4 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">
                            Dados da Entrega
                        </h4>
                        
                        <label>Status Entrega:</label>
                        <select id="status-entrega-${pedido.codPedido}" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
                            <option value="AGUARDANDO_ENVIO" ${entrega.statusEntrega === 'AGUARDANDO_ENVIO' ? 'selected' : ''}>Aguardando Envio</option>
                            <option value="EM_TRANSITO" ${entrega.statusEntrega === 'EM_TRANSITO' ? 'selected' : ''}>Em Trânsito</option>
                            <option value="SAIU_PARA_ENTREGA" ${entrega.statusEntrega === 'SAIU_PARA_ENTREGA' ? 'selected' : ''}>Saiu p/ Entrega</option>
                            <option value="ENTREGUE" ${entrega.statusEntrega === 'ENTREGUE' ? 'selected' : ''}>Entregue</option>
                            <option value="EXTRAVIADO" ${entrega.statusEntrega === 'EXTRAVIADO' ? 'selected' : ''}>Extraviado</option>
                            <option value="DEVOLVIDO" ${entrega.statusEntrega === 'DEVOLVIDO' ? 'selected' : ''}>Devolvido</option>
                        </select>

                        <label>Rastreio:</label>
                        <input type="text" id="rastreio-${pedido.codPedido}" value="${entrega.codigoRastreio || ''}" placeholder="Cód Rastreio" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">

                        <label>Transportadora:</label>
                        <input type="text" id="transp-${pedido.codPedido}" value="${entrega.transportadora || ''}" placeholder="Nome Transportadora" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">

                        <div style="display: flex; gap: 10px; margin-top: 5px;">
                            <div style="flex: 1;">
                                <label style="font-size: 0.8em;">Estimada:</label>
                                <input type="date" id="data-est-${pedido.codPedido}" value="${formatDataInput(entrega.dataEstimada)}" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
                            </div>
                            <div style="flex: 1;">
                                <label style="font-size: 0.8em;">Real:</label>
                                <input type="date" id="data-ent-${pedido.codPedido}" value="${formatDataInput(entrega.dataEntrega)}" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 20px;">
                    <button 
                        class="btn-salvar"
                        data-id="${pedido.codPedido}"
                        style="
                            width: 100%; 
                            padding: 12px; 
                            background-color: #28a745; 
                            color: white; 
                            border: none; 
                            border-radius: 6px; 
                            font-size: 1rem; 
                            font-weight: bold; 
                            cursor: pointer; 
                            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                            transition: background-color 0.3s;"
                        onmouseover="this.style.backgroundColor='#218838'"
                        onmouseout="this.style.backgroundColor='#28a745'"
                    >
                        Salvar Alterações
                    </button>
                </div>

                <hr style="margin: 20px 0;">
                
                <h4>Itens do Pedido:</h4>
                <ul id="lista-itens-${pedido.codPedido}" class="lista-itens"></ul>
            `

            listaPedidosElement.appendChild(divPedido)
            const ulItens = document.getElementById(`lista-itens-${pedido.codPedido}`)
            
            if (itens && itens.length > 0) {
                itens.forEach(item => {
                    const nome = item.produtoItem ? item.produtoItem.nome : `Produto ID ${item.idProduto}`
                    const li = document.createElement("li")
                    li.innerHTML = `<span><strong>${item.quantidade}x</strong> ${nome}</span> <span>R$ ${item.valorTotalItem}</span>`
                    ulItens.appendChild(li)
                })
            } else {
                ulItens.innerHTML = "<li>Sem itens registrados.</li>"
            }
        })
    })
    .catch(err => console.log(err))
})