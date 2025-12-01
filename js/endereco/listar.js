let principal = document.getElementById("principal")
let normais = document.getElementById("normais")

    const email = sessionStorage.getItem("email")
    const token = sessionStorage.getItem("token")

    const valores = {
        email: email
    }

    fetch(`https://ecomback-production-f02d.up.railway.app/endereco/listar `, {
        method: "POST",
        headers: { "content-type":"application/json",
            "Authorization": `Bearer: ${token}`
         },
         body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)
        let tabelaP = `<table id="tablePrincipal">
    <thead>
        <tr>
            <th>Apelido</th>
            <th>CEP</th>
            <th>UF</th>
            <th>Localidade</th>
            <th>Logradouro</th>
            <th>Bairro</th>
            <th>Numero</th>
            <th>Apagar</th>
        </tr>
    </thead><tbody>`

        dados.forEach(dad => {
            if(dad.is_principal === true){
                            tabelaP += `
        <tr>
            <td>${dad.apelido}</td>
            <td>${dad.cep}</td>
            <td>${dad.uf}</td>
            <td>${dad.localidade}</td>
            <td>${dad.logradouro}</td>
            <td>${dad.bairro}</td>
            <td>${dad.numero}</td>
            <td><button data-id="${dad.codEndereco}" class="apagar">Apagar</button></td>
        </tr>
    `
            }
        })
        tabelaP += `</tbody>
</table>`



        principal.innerHTML = tabelaP

        let tabelaN = `<table id="tableNormal">
    <thead>
        <tr>
            <th>Apelido</th>
            <th>CEP</th>
            <th>UF</th>
            <th>Localidade</th>
            <th>Logradouro</th>
            <th>Bairro</th>
            <th>Numero</th>
            <th>Apagar</th>
        </tr>
    </thead><tbody>`

        dados.forEach(dad => {
            if(dad.is_principal === false){
                            tabelaN += `
        <tr>
            <td>${dad.apelido}</td>
            <td>${dad.cep}</td>
            <td>${dad.uf}</td>
            <td>${dad.localidade}</td>
            <td>${dad.logradouro}</td>
            <td>${dad.bairro}</td>
            <td>${dad.numero}</td>
            <td><button date-id="${dad.codEndereco}" class="apagar">Apagar</button></td>
        </tr>
    `
            }
        })
        tabelaN += `</tbody>
</table>`

        normais.innerHTML = tabelaN

        ativarEventosApagar()
        
    })
    .catch(err =>{
        console.error("Erro ao listar o endereço: ", err)
    })

function ativarEventosApagar() {
    const botoes = document.querySelectorAll(".apagar")

    botoes.forEach(botao => {
        botao.addEventListener("click", (e) => {
            e.preventDefault()

            const elementoClicado = e.target
            const id = elementoClicado.dataset.id
            const token = sessionStorage.getItem("token")

            fetch(`https://ecomback-production-f02d.up.railway.app/endereco/${id}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer: ${token}` 
                }
            })
            .then(resp => {
                if (resp.ok) {
                    console.log("Apagado com sucesso")
                    window.location.reload()
                } else {
                    alert("Erro ao apagar endereço.")
                }
            })
            .catch(err => {
                console.error("Erro ao apagar o endereço: ", err)
            })
        })
    })
}
