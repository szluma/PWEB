const API_URL = "http://localhost:3000/usuarios";

const bt = document.getElementById("bt");
const modal = document.getElementById("modal-overlay");

bt.addEventListener("click", ()=> {
    modal.classList.add("active");
})

modal.addEventListener("click", (e)=> {
    if(e.target === modal){
        modal.classList.remove("active");
    }
})