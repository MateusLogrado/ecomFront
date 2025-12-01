// Referências aos elementos
const areaCarrinho = document.getElementById('area-carrinho')
const totalTexto = document.getElementById('total')
const btnLimpar = document.getElementById('limpar')    
const btnFinalizar = document.getElementById('finalizar') 
const btnVoltar = document.getElementById('voltar')    

// Recupera os produtos do localStorage
let produtos = JSON.parse(localStorage.getItem('produtos')) || []

// Função para renderizar a tabela
function mostrarCarrinho() {
    if (produtos.length === 0) {
        areaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>'
        totalTexto.textContent = 'Total: R$ 0,00'
        return
    }

    let total = 0
    
    let tabelaHTML = `
        <table class="tabela-carrinho">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Preço Unidade</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
    `

    // Itera sobre os produtos salvos no localStorage
    produtos.forEach(p => {
        // Garante que são números para o cálculo
        const precoNum = parseFloat(p.preco)
        const qtdeNum = parseInt(p.qtde)
        const subtotal = precoNum * qtdeNum
        
        total += subtotal

        // Cria a linha da tabela para este produto
        tabelaHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>R$ ${precoNum.toFixed(2)}</td>
                <td>${qtdeNum}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
            </tr>
        `
    })

    // Fechamento da tabela
    tabelaHTML += `
            </tbody>
        </table>
    `

    // Insere o HTML na página
    areaCarrinho.innerHTML = tabelaHTML
    totalTexto.textContent = `Total: R$ ${total.toFixed(2)}`
}

// --- Eventos dos Botões ---

// 1. Finalizar Compra
btnFinalizar.addEventListener('click', () => {
    if (produtos.length === 0) {
        alert('Seu carrinho está vazio!')
        return
    }

    // Envia para o backend (ajustado para enviar o array de produtos)
    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            itens: produtos,
            total: parseFloat(totalTexto.textContent.replace('Total: R$ ', ''))
        })
    })
    .then(res => res.json())
    .then(dados => {
        console.log('Sucesso:', dados)
        alert('Compra finalizada com sucesso!')
        
        // Limpa o carrinho após o sucesso
        localStorage.removeItem('produtos')
        produtos = []
        mostrarCarrinho()
    })
    .catch(err => {
        console.error('Erro:', err)
        alert('Erro ao processar a compra. Tente novamente.')
    })
})

// Botão de limpar carrilho
btnLimpar.addEventListener('click', () => {
    areaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>'
    totalTexto.textContent = 'Total: R$ 0,00'
    localStorage.clear()
})
// Botão de voltar à loja
btnVoltar.addEventListener('click', () => {
    window.location.href = './index.html'
})

// Exibe os produtos ao carregar a página
mostrarCarrinho()