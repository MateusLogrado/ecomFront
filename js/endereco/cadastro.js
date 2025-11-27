let button = document.getElementById("button")
let res= document.getElementById("res")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    
    let cep = document.getElementById("cep").value
    let complemento = document.getElementById("complemento").value
    let logradouro = document.getElementById("logradouro").value
    let bairro = document.getElementById("bairro").value
    let localidade = document.getElementById("localidade").value
    let uf = document.getElementById("uf").value
    let numero = document.getElementById("numero").value
    let apelido = document.getElementById("apelido").value
    let is_principal = document.getElementById("is_principal").value

    const email = sessionStorage.getItem("email")
    const token = sessionStorage.getItem("token")

    const valores = {
        cep: cep,
        complemento: complemento,
        logradouro: logradouro,
        bairro: bairro,
        localidade: localidade,
        uf: uf,
        numero: numero,
        apelido: apelido,
        is_principal: is_principal,
        email: email
    }

    fetch(`http://localhost:3000/endereco `, {
        method: "POST",
        headers: { "content-type":"application/json",
            "Authorization": `Bearer: ${token}`
         },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)

        res.innerHTML = dados.message
    })
    .catch(err =>{
        console.error("Erro ao cadastrar o endereço: ", err)
    })
})