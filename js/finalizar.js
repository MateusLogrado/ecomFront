const finalizar = document.getElementById("finalizar")
const token = sessionStorage.getItem("token")

finalizar.addEventListener("click", (e)=>{
    e.preventDefault()

    let produtos = JSON.parse(localStorage.getItem('produtos'))

    

    fetch(`localhost:3000/itemPedido`,{
        method: "POST",
        headers: { "Content-type":"Application/json",
            "Authorization": `Bearer: ${token}`
         },
         body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
})