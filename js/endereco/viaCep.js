let viaCep = document.getElementById("viaCep")

viaCep.addEventListener("click", (e)=>{
    e.preventDefault()

    let cep = document.getElementById("cep").value

    let complemento = document.getElementById("complemento")
    let logradouro = document.getElementById("logradouro")
    let bairro = document.getElementById("bairro")
    let localidade = document.getElementById("localidade")
    let uf = document.getElementById("uf")

    fetch(`http://viacep.com.br/ws/${cep}/json/ `)
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)

        complemento.value = dados.complemento
        logradouro.value = dados.logradouro
        bairro.value = dados.bairro
        localidade.value = dados.localidade
        uf.value = dados.uf
    })
    .catch(err =>{
        console.error("Erro ao buscar o CEP: ", err)
    })
})