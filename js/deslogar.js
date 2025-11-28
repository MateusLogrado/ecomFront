let deslogar = document.getElementById("deslogar")

deslogar.addEventListener("click", (e)=>{
    e.preventDefault()

    sessionStorage.clear()

    window.location.reload(forceReload)
})