const areaCarrinho = document.getElementById('area-carrinho')
const totalTexto = document.getElementById('total')
const btnLimpar = document.getElementById('limpar')    
const btnFinalizar = document.getElementById('finalizar') 
const btnVoltar = document.getElementById('voltar')    

let produtos = JSON.parse(localStorage.getItem('produtos')) || []

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

    produtos.forEach(p => {
        const precoNum = parseFloat(p.preco)
        const qtdeNum = parseInt(p.qtde)
        const subtotal = precoNum * qtdeNum
        
        total += subtotal

        tabelaHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>R$ ${precoNum.toFixed(2)}</td>
                <td>${qtdeNum}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
            </tr>
        `
    })

    tabelaHTML += `
            </tbody>
        </table>
    `

    areaCarrinho.innerHTML = tabelaHTML
    totalTexto.textContent = `Total: R$ ${total.toFixed(2)}`
}

btnFinalizar.addEventListener('click', () => {
    if (produtos.length === 0) {
        alert('Seu carrinho está vazio!')
        return
    }

    fetch('https://ecomback-production-f02d.up.railway.app/produto', {
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
        localStorage.removeItem('produtos')
        produtos = []
        mostrarCarrinho()
    })
    .catch(err => {
        console.error('Erro:', err)
        alert('Erro ao processar a compra. Tente novamente.')
    })
})

btnLimpar.addEventListener('click', () => {
    areaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>'
    totalTexto.textContent = 'Total: R$ 0,00'
    localStorage.clear()
})
btnVoltar.addEventListener('click', () => {
    window.location.href = './index.html'
})

mostrarCarrinho()