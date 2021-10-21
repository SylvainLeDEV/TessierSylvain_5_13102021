const nameProduct = document.querySelector("#title")
const priceProduct = document.querySelector("#price");
const descriptionProduct = document.querySelector("#description");
const colorsOfProduct = document.querySelector("#colors");
console.log(colorsOfProduct)

let productData = [];
let id;


//URL------------------------
//On récupère l'id dans l'url du canapé que on inject ensuit dans le fetch
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

    console.log(productData);
}

const productDisplay = async () => {

    await fetchDataProduct();

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

function addToCart() {

    let addPanier = document.querySelector("#addToCart");

    localStorage.setItem()


}