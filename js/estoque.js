          const token1 = sessionStorage.getItem("token")
          
          const valoresEstoque = {
            idProduto: 21,
            quantidade_minima: 5

        }

        console.log(valoresEstoque)

        fetch(`http://localhost:3000/estoque`, {
        method: "POST",
        headers: { "content-type":"application/json",
            "Authorization": `Bearer ${token1}`
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