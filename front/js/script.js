//Asynchrone--
//-----------
//Soit avec setTimeout ex :
//setTimeout(() => {
//console.log("test");
//}, 2000);

//Ou alors avec les Promise (async et await) utilisé pour ce projet.

//Pour chercher un fichier text
// fetch("http://localhost:3000/api/products").then((res) => res.text()).then((data) => console.log(data))

//l'acceuil -----------------------------------------------------
const sectionCards = document.getElementById("items");
console.log(sectionCards)
//---------------------------
//Variable pour stocker les données des canapé.
let kanapData = [];
//Fonction async pour aller chercher les donées dans l'api
const fetchDataKanap = async () => {

    await fetch("http://localhost:3000/api/products")
        //La méthode .json() => méthode qui s'auto-résout en renvoyant le Body de la requête.
        .then((res) => res.json())
        .then((data) => (kanapData = data))
        .catch((err) => alert("Une erreur est survenue :" + " " + err + " " + "Lancer l'API"))

    console.log("Les datas de l'API : ", kanapData)
}

function totalProductDisplay() {
    const totalPanierDisplay = document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > nav > ul > a:nth-child(2) > li")
    //Total d'articles dans le panier
    if (localStorage.getItem("totalProduct") === null){
        totalPanierDisplay.textContent = `Panier`
    } else {
        totalPanierDisplay.textContent = `Panier : ${JSON.parse(localStorage.getItem("totalProduct"))}`
    }
}

// Une fonction pour afficher les canapé dans les cards
const kanapCardsDisplay = () => {
    totalProductDisplay();
    sectionCards.innerHTML = kanapData.map((data) =>
        `
        <a href="./product.html?id=${data._id}">
        <article>
              <img src="${data.imageUrl}" alt="${data.altTxt}">
              <h3 class="productName">${data.name}</h3>
              <p class="productDescription">${data.description}</p>
        </article>
        </a>
        `
    ).join("")//join enlève les guillemets entre chaque article.
};

fetchDataKanap()
    .then(() => kanapCardsDisplay())
