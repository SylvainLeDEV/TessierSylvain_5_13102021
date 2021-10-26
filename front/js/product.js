const imgProduct = document.querySelector("body > main > div > section > article > div.item__img")
const nameProduct = document.querySelector("#title")
const priceProduct = document.querySelector("#price");
const descriptionProduct = document.querySelector("#description");
const colorsOfProduct = document.querySelector("#colors");
const quantityProduct = document.querySelector("#quantity");
const addPanier = document.querySelector("#addToCart");

let productData = [];

//URL------------------------
//On récupère l'id dans l'url du canapé que on inject ensuit dans le fetch
let id;
let searchParams = new URLSearchParams(window.location.search)
if (searchParams.has("id")) {
    id = searchParams.get("id")
    console.log(" L'id du récupéré dans l'URL : " , id)
}
// console.log(window.location.search)
// ---------------------------

// Appel de l'API
const fetchDataProduct = async () => {

    await fetch("http://localhost:3000/api/products/" + id)
        .then((res) => res.json())
        .then((data) => productData = data)

    console.log("Produit dans productData : ", productData);
}
//Afficher le produit--------------------------------
const productDisplay = async () => {

    await fetchDataProduct();

    imgProduct.innerHTML =
        `
     <img src="${productData.imageUrl}" alt="${productData.altTxt}">
    `
    nameProduct.innerHTML = productData.name;
    priceProduct.innerHTML = productData.price;
    descriptionProduct.innerHTML = productData.description;
    colorsOfProduct.innerHTML = productData.colors.map((colors) =>
        `
     <option value="${colors}">${colors}</option>
    `
    ).join(" ")

}
productDisplay();

//Quantité du produit
let numberKanap;
quantityProduct.addEventListener('input', (e) => {
    numberKanap = e.target.value
})

//Check le nombre de produit par le nom et la couleur ---------------------
function checkSameProduct(tableauPannier, itemName, itemColors) {
    for (x of tableauPannier) {
        if (x.name == itemName && x.color == itemColors) {
            x.quantity++;
            return true;
        }
    }
}

function addToCart() {
    addPanier.addEventListener('click', (e) => {
            e.preventDefault();

            let tableauPannier = [];
            console.log(tableauPannier)

            let colorsOptionProduct = document.querySelector("select").value;
            const kanap = {
                img: productData.imageUrl,
                alt: productData.altTxt,
                name: productData.name,
                color: colorsOptionProduct,
                description: productData.description,
                price: productData.price / 100,
                quantity: numberKanap,
                _id: id,
            }
        console.log("numbre : ", numberKanap);
            if (localStorage.getItem("dataPannier")) {
                tableauPannier = JSON.parse(localStorage.getItem("dataPannier"))
                if (checkSameProduct(tableauPannier, kanap.name, kanap.color)) {
                    localStorage.setItem("dataPannier", JSON.stringify(tableauPannier))
                } else {
                    tableauPannier.push(kanap);
                    localStorage.setItem("dataPannier", JSON.stringify(tableauPannier));
                }
            } else {
                tableauPannier.push(kanap)
                localStorage.setItem("dataPannier", JSON.stringify(tableauPannier))
            }
            // tableauPannier.push(kanap);
            //Je stock dans le local storage pour récupérer les infos dans cart.js
            // localStorage.setItem("dataPannier", JSON.stringify(tableauPannier));
        }
    )
};
addToCart();
