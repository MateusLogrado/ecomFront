let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    const valores = {
        email: email,
        senha: senha,
    }

    fetch(`https://ecomback-production-f02d.up.railway.app/login`, {
        method: "POST",
        headers: { "content-type":"application/json", },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = dados.message

        sessionStorage.setItem("token", dados.token)
        sessionStorage.setItem("nome", dados.nome)
        sessionStorage.setItem("email", dados.email)

        setTimeout(()=>{
                window.location.href = "../../index.html"
            }, 1000)
    })
    .catch(err =>{
        console.error("Erro ao efetuar o login do usuario: ", err)
    })
})