const imgProduct = document.querySelector("body > main > div > section > article > div.item__img")
const nameProduct = document.querySelector("#title")
const priceProduct = document.querySelector("#price");
const descriptionProduct = document.querySelector("#description");
const colorsOfProduct = document.querySelector("#colors");
const amountProduct = document.querySelector("#quantity")
const addPanier = document.querySelector("#addToCart");
console.log(imgProduct)

let productData = [];

//URL------------------------
//On récupère l'id dans l'url du canapé que on inject ensuit dans le fetch
let id;
let searchParams = new URLSearchParams(window.location.search)
if (searchParams.has("id")) {
    id = searchParams.get("id")
    console.log(id)
}
// console.log(window.location.search)
// ---------------------------

// Appel de l'API
const fetchDataProduct = async () => {

    await fetch("http://localhost:3000/api/products/" + id)
        .then((res) => res.json())
        .then((data) => productData = data)

    console.log(productData.imageUrl);
}

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
amountProduct.addEventListener('input', (e) => {
     numberKanap = e.target.value
})
//---------------------

function addToCart() {

    addPanier.addEventListener('click', (e) => {
        e.preventDefault();

        const tableauPannier = [];
        console.log(tableauPannier)
        const pannier = {
            img: productData.imageUrl,
            alt: productData.altTxt,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            amount: numberKanap,
            _id: id,
        }
        tableauPannier.push(pannier);
        //Je stock dans le local storage pour récupérer les infos dans cart.js
        localStorage.setItem("dataPannier", JSON.stringify(tableauPannier));

        for (let i = 0; i < tableauPannier.length; i++){
            
        }

    })
};
addToCart();
