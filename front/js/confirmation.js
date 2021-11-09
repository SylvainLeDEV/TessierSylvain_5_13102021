if (JSON.parse(localStorage.getItem("dataPannier")) !== null) {
    let orderId;
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has("_orderId")) {
        orderId = searchParams.get("_orderId")
        console.log(" L'id du récupéré dans l'URL : ", orderId)
    }


    const displayOrderId = document.getElementById("orderId");
    displayOrderId.textContent = orderId;
} else {
    window.location.href = "index.html"
}

const resumeCommande = JSON.parse(localStorage.getItem("dataPannier"));
const resumePrise = JSON.parse(localStorage.getItem("totalPrise"));
const resumeTotalArticles = JSON.parse(localStorage.getItem("totalProduct"))
console.log(resumePrise + "   " + resumeTotalArticles)

const listeKanapCommande = document.querySelector("#limitedWidthBlock > div >p")
listeKanapCommande.innerHTML += resumeCommande.map((panier) =>
    `<ul>
<li>Vous avez commandé <b>${panier.quantity}</b> <b>${panier.name}</b> de couleur <b>${panier.color}</b></li>
</ul>
`
).join(" ")
listeKanapCommande.innerHTML +=
    `<br>Total d'articles : <b>${resumeTotalArticles}</b>
     <br>Prix total de la commande : <b>${resumePrise} €</b>`

const listeKanapCommandeStyle = document.querySelectorAll("#limitedWidthBlock > div >p > ul")
for (let x = 0; x < listeKanapCommandeStyle.length; x++) {
    listeKanapCommandeStyle[x].style.listStyleType = "none";
}

//Fonction pour le compte a rebour
function compteRebour(value) {
    setTimeout(() => {
        const buttonReturnToHome = document.querySelector("#order")
        console.log(buttonReturnToHome)
        let counter = value;
        let timer = setInterval(() => {
            counter--
            buttonReturnToHome.value = "Revenir à l'accueil (" + counter + ")";
            if (counter === 0) {
                window.location.reload();
                console.log("over")
                window.location.href = "index.html"
                localStorage.clear();
                clearInterval(timer);
            }
        }, 1000);
    }, 1000);
    return value;
}

//Construction du button ------
const buttonReturnToHome = document.querySelector(".confirmation > p")
buttonReturnToHome.innerHTML +=
    `<br><div class="buttonReturnToHomme" style="padding-top: 15px">
     <input type="submit" id="order" value="Revenir à l'accueil (${compteRebour(600)})">
     </div>`

const button = document.querySelector("#limitedWidthBlock > div > p > div > input")

button.style.borderRadius = "40px"
button.style.fontSize = "22px"
button.style.border = "0"
button.style.backgroundColor = "#2c3e50"
button.style.color = "white"
button.style.padding = "18px 20px"
button.style.cursor = "pointer"

button.addEventListener('click', (e) => {
    localStorage.clear();
    window.location.reload();
    window.location.href = "index.html";
})


button.addEventListener("mouseenter", (e) => {
    button.style.boxShadow = "rgb(42 18 206 / 90%) 0 0 22px 6px";
})
button.addEventListener("mouseleave", (e) => {
    button.style.boxShadow = "";
})

const cleanLocalStorageOnClick = [document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > nav > ul > a:nth-child(2) > li"),
    document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > nav > ul > a:nth-child(1) > li"), document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > a > img")];
console.log(cleanLocalStorageOnClick)
cleanLocalStorageOnClick.forEach(el => {
    console.log(el)
    el.addEventListener('click', (e) => {
        console.log(e, "suce")
        window.location.reload();
        localStorage.clear();
    })
});

//----------------------------------------------
//Si la page est reload :
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        window.location.href = "index.html"
        localStorage.clear();
}

setTimeout(() => {
    // localStorage.removeItem("")
}, 1000)



