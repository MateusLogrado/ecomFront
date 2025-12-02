let enderecoSelect = document.getElementById("enderecos")
const email = sessionStorage.getItem("email")
const tokenSelect = sessionStorage.getItem("token")

    const usuario = {
        email: email
    }

fetch(`http://localhost:3000/endereco/listar`,{
method: "POST",
headers: { "Content-type":"Application/json",
    "Authorization": `Bearer: ${tokenSelect}`
 },
 body: JSON.stringify(usuario)
})
.then(resp => resp.json())
.then(endereco =>{
    console.log(endereco)

    endereco.forEach(ende => {
        if(ende.is_principal === true){
            enderecoSelect.innerHTML += `<option value="${ende.codEndereco}" selected>${ende.apelido}</option>`
        }else if(ende.is_principal === false){
            enderecoSelect.innerHTML += `<option value="${ende.codEndereco}">${ende.apelido}</option>`
        }
    })
    
})
.catch(err =>{
    console.error("Erro ao pegar o endereço pro select:", err)
})

