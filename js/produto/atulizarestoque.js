let button = document.getElementById("button")
let res = document.getElementById("res")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    const token = sessionStorage.getItem("token")

    let nomeA = document.getElementById("nome").value
    let quantidade_atualA = document.getElementById("quantidade_atual").value
    let quantidade_minimaA = document.getElementById("quantidade_minima").value

        const valores = {
        nome: nomeA,
        quantidade_atual: quantidade_atualA,
        quantidade_minima: quantidade_minimaA,
    }

    fetch(`http://localhost:3000/estoque`, {
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