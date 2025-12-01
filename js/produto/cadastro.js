let button = document.getElementById("button")
let res = document.getElementById("res")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    const token = sessionStorage.getItem("token")

    let nome = document.getElementById("nome").value
    let descricao = document.getElementById("descricao").value
    let nivelPicancia = document.getElementById("nivelPicancia").value
    let preco = Number(document.getElementById("preco").value)
    let imagem_url = document.getElementById("imagem_url").value
    let ativo = document.getElementById("ativo").value
    

    const valores = {
        nome: nome,
        descricao: descricao,
        nivelPicancia: nivelPicancia,
        preco: preco,
        imagem_url: imagem_url,
        ativo: ativo
    }

        fetch(`https://https://localhost:3000/produto`, {
        method: "POST",
        headers: { "content-type":"application/json",
            "Authorization": `Bearer: ${token}`
         },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(produto => {
        console.log(produto)

        cadastrarEstoque(produto.codProduto, token)
    })

    .catch(err =>{
        console.error("Erro ao cadastrar o produto: ", err)
    })
})


function cadastrarEstoque(id, token){
let quantidade_minima = Number(document.getElementById("quantidade_minima").value)


            const valoresEstoque = {
            idProduto: id,
            quantidade_minima: quantidade_minima

        }

        console.log(valoresEstoque)

        fetch(`http://localhost:3000/estoque`, {
        method: "POST",
        headers: { "content-type":"application/json",
            "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify(valoresEstoque)
    })
    .then(resp => resp.json())
    .then(estoque => {
        res.innerHTML = estoque.message
    })
    .catch(err =>{
        console.error("Erro ao cadastrar o estoque: ", err)
    })
}