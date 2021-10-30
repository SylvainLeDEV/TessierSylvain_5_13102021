const imgProduct = document.querySelector("body > main > div > section > article > div.item__img")
const nameProduct = document.querySelector("#title")
const priceProduct = document.querySelector("#price");
const descriptionProduct = document.querySelector("#description");
const colorsOfProduct = document.querySelector("#colors");
const colorsOptionProduct = document.querySelector("select").value;
const quantityProduct = document.querySelector("#quantity");
const addPanier = document.querySelector("#addToCart");

let productData = [];

//URL------------------------
//On récupère l'id dans l'url du canapé que on inject ensuit dans le fetch
let id;
let searchParams = new URLSearchParams(window.location.search)
if (searchParams.has("id")) {
    id = searchParams.get("id")
    console.log(" L'id du récupéré dans l'URL : ", id)
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
    priceProduct.innerHTML = productData.price / 10;
    descriptionProduct.innerHTML = productData.description;
    colorsOfProduct.innerHTML += productData.colors
        .map((color) =>
            `
     <option value="${color}">${color}</option>
    `
        ).join(" ")

    console.log(colorsOfProduct)
    console.log(productData.colors)

}
productDisplay();

//Quantité du produit
let numberKanap;
quantityProduct.addEventListener('change', (e) => {
    numberKanap = parseInt(e.target.value);
})

function onChangeColor() {
    const colorsOptionProduct = document.querySelector("select");
    colorsOptionProduct.addEventListener('change', (e) => {
        const findColor = dataPannier.find((colors) =>
            dataPannier.color === colors.color
        )
        if (findColor) {
            document.querySelector(".item__content__settings__quantity > label").innerHTML =
                `Nombre d'article(s) (1-100) :`
            console.log(e.target.value)
        }

    });

}

// onChangeColor()

function addToCart() {

    addPanier.addEventListener('click', (e) => {
            e.preventDefault();
            let tableauPannier = [];
            let colorsOptionProduct = document.querySelector("select").value;
            const kanap = {
                img: productData.imageUrl,
                alt: productData.altTxt,
                name: productData.name,
                color: colorsOptionProduct,
                description: productData.description,
                price: productData.price / 10,
                quantity: numberKanap,
                _id: id,
            }
            //Ne valide pas si il n'y a pas de quantité et de couleurs
            if (!colorsOptionProduct || !numberKanap || numberKanap > 100) {
                alert("Choisissez une couleurs et un nombrer d'article entre 1 et 100")
            } else {
                console.log(kanap.color)
                console.log(kanap.quantity)
                //Envoie les données dans le local storage + change len quantité si la couleur et l'id est la même
                if (typeof localStorage != 'undefined' && localStorage.getItem("dataPannier") != null) {
                    tableauPannier = JSON.parse(localStorage.getItem("dataPannier"));
                    const findProduct = tableauPannier.find((product) =>
                        kanap._id === product._id && kanap.color === product.color
                    )
                    if (findProduct) {
                        findProduct.quantity = numberKanap;
                        document.querySelector(".item__content__settings__quantity > label").innerHTML =
                            `
                            Vous avez maintenant ${numberKanap} ${kanap.name} ${colorsOptionProduct} dans le pannier
                            `
                        localStorage.setItem("dataPannier", JSON.stringify(tableauPannier))
                    } else {
                        tableauPannier.push(kanap)
                        localStorage.setItem("dataPannier", JSON.stringify(tableauPannier))
                        document.querySelector(".item__content__settings__quantity > label").innerHTML =
                            `Nombre d'article(s) (1-100) :`
                    }
                } else {
                    tableauPannier.push(kanap)
                    localStorage.setItem("dataPannier", JSON.stringify(tableauPannier))
                }
                // tableauPannier.push(kanap);
                //Je stock dans le local storage pour récupérer les infos dans cart.js
                // localStorage.setItem("dataPannier", JSON.stringify(tableauPannier));
            }
        }
    )
};
addToCart();