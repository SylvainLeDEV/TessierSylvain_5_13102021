const displayOrderId = document.getElementById("orderId");

let orderId;
let searchParams = new URLSearchParams(window.location.search)
if (searchParams.has("_orderId")) {
    orderId = searchParams.get("_orderId")
    console.log(" L'id du récupéré dans l'URL : ", orderId)
}

displayOrderId.textContent = orderId;


const resumeCommande = JSON.parse(localStorage.getItem("dataPannier"));
console.log(resumeCommande)

const listeKanapCommande = document.querySelector("#limitedWidthBlock > div >p")


listeKanapCommande.innerHTML += resumeCommande.map((panier) =>
    `<ul>
<li>Vous avez commandé <b>${panier.quantity}</b> <b>${panier.name}</b> de couleur <b>${panier.color}</b></li>
</ul>`
).join(" ")

const listeKanapCommandeStyle = document.querySelectorAll("#limitedWidthBlock > div >p > ul")
for (let x = 0 ; x < listeKanapCommandeStyle.length; x++){
listeKanapCommandeStyle[x].style.listStyleType = "none";
}

setTimeout(() => {
    // localStorage.removeItem("")
})


