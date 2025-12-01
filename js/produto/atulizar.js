let button = document.getElementById("button")
let res = document.getElementById("res")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    const token = sessionStorage.getItem("token")

    let nomeA = document.getElementById("nome").value
    let descricaoA = document.getElementById("descricao").value
    let nivelPicanciaA = document.getElementById("nivelPicancia").value
    let precoA = document.getElementById("preco").value
    let imagem_urlA = document.getElementById("imagem_url").value
    let ativoA = document.getElementById("ativo").value

        const valores = {
        nome: nomeA,
        descricao: descricaoA,
        nivelPicancia: nivelPicanciaA,
        preco: precoA,
        imagem_url: imagem_urlA,
        ativo: ativoA
    }

    fetch(`http://https://localhost:3000/produto`, {
        method: "PUT",
        headers: { "content-type":"application/json",
            "Authorization": `Bearer: ${token}`
         },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
    console.log(dados)
        res.innerHTML = dados.message
        
    })
    .catch(err =>{
        console.error("Erro ao atualizar o produto: ", err)
    })
    })