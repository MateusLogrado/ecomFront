let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    let senha = document.getElementById("senha").value
    const email = sessionStorage.getItem("email")

    const token = sessionStorage.getItem("token")

    const valores = {
        senha: senha,
        email: email
    }

    fetch(`https://ecomback-production-f02d.up.railway.app/usuario`, {
        method: "DELETE",
        headers: { "content-type":"application/json",
            "Authorization": `Bearer: ${token}`
         },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = dados.message  

        sessionStorage.clear()
        
        setTimeout(()=>{
                window.location.href = "../../index.html"
        }, 2000)
    })
    .catch(err =>{
        console.error("Erro ao apagar o usuario: ", err)
    })
})