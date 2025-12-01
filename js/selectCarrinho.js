let enderecos = document.getElementById("enderecos")
const email = sessionStorage.getItem("email")
const tokenSelect = sessionStorage.getItem("token")

const valores = {
    email: email
}

fetch(`http://localhost:3000/usuario/consultar`,{
    method: "POST",
    headers: { "Content-type":"Application/json",
        "Authorization": `Bearer: ${tokenSelect}`
     },
     body: JSON.stringify(valores)
})
.then(resp => resp.json())
.then(dados =>{
    console.log(dados)
})


let select = document.getElementById("nome")

enderecos.addEventListener("change", (e)=>{
    e.preventDefault()

    let descricao = document.getElementById("descricao")
    let nivelPicancia = document.getElementById("nivelPicancia")
    let preco = document.getElementById("preco")
    let imagem_url = document.getElementById("imagem_url")
    let ativo = document.getElementById("ativo")

    fetch(`http://localhost:3000/produto`)
    .then(resp => resp.json())
    .then(dados =>{
    console.log(dados)

        const produto = dados.find(dad => dad.nome === select.value)

        console.log("Achado: ", produto)

        descricao.value = produto.descricao
        nivelPicancia.value = produto.nivelPicancia
        preco.value = produto.preco
        imagem_url.value = produto.imagem_url
        ativo.value = produto.ativo
})
})