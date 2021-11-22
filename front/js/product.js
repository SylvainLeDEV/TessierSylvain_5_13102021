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
//
/**
 *On récupère l'id dans l'url du canapé que on inject ensuit dans le fetch
 * @type {URLSearchParams}
 */
let id;
let searchParams = new URLSearchParams(window.location.search)
if (searchParams.has("id")) {
    id = searchParams.get("id")
    console.log(" L'id récupéré dans l'URL : ", id)
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

//Total d'articles dans le panier --------------------
function totalProductDisplay() {
    const totalPanierDisplay = document.querySelector("body > header > div.limitedWidthBlockContainer.menu > div > nav > ul > a:nth-child(2) > li")
    if (localStorage.getItem("totalProduct") === null) {
        totalPanierDisplay.textContent = `Panier`
    } else {
        totalPanierDisplay.textContent = `Panier : ${JSON.parse(localStorage.getItem("totalProduct"))} articles`
    }
}


//Afficher le produit--------------------------------
const productDisplay = () => {
    totalProductDisplay();
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
}


//Lorsque je change de couleur ça affiche le montant d'articles dans le panier --------
function onChangeColor(e) {
    const colorsOptionProduct = document.querySelector("select");
    colorsOptionProduct.addEventListener('change', (e) => {
        const dataPanier = JSON.parse(localStorage.getItem("dataPannier"));

        if (dataPanier !== null) {
            for (let c = 0; c < dataPanier.length; c++) {
                const productLocalStorage = dataPanier[c].name + dataPanier[c].color
                const product = e.path[3].querySelector(".item__content__titlePrice h1").textContent + e.target.value
                const quantityProduct = dataPanier[c].quantity
                // console.log(product)
                // console.log(productLocalStorage)

                if (productLocalStorage !== product) {
                    document.querySelector(".item__content__settings__quantity > label").textContent = "Nombre d'article(s) (1-100) : ";

                }
            }

            for (let c = 0; c < dataPanier.length; c++) {
                const productLocalStorage = dataPanier[c].name + dataPanier[c].color
                const product = e.path[3].querySelector(".item__content__titlePrice h1").textContent + e.target.value
                const quantityProduct = dataPanier[c].quantity
                // console.log(quantityProduct)


                if (productLocalStorage === product) {
                    document.querySelector(".item__content__settings__quantity > label").textContent =
                        `Vous avez ${quantityProduct} ${dataPanier[c].name} ${dataPanier[c].color} dans le pannier`
                }
            }
        }
    });
}

//L'orsque je click j'ajoute le produit au panier (LocalStorage) ---------------------
function addToCart() {
    let tableauPannier = [];

    function totalProduct() {
        //Total d'articles dans le panier
        let tableauTotalProduct = 0;
        tableauPannier.forEach((productKanap) => {
            tableauTotalProduct += productKanap.quantity
        })
        if (tableauTotalProduct !== 0) {
            localStorage.setItem("totalProduct", JSON.stringify(tableauTotalProduct))
            tableauTotalProduct.textContent = `Panier : ${JSON.parse(localStorage.getItem("totalProduct"))}`
        }
    }


//Quantité du produit
    let numberKanap;
    quantityProduct.addEventListener('change', (e) => {
        numberKanap = parseInt(e.target.value);
    })

    addPanier.addEventListener('click', (e) => {
            e.preventDefault();
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
                //Envoie les données dans le local storage + change les quantité si la couleur et l'id est la même
                if (typeof localStorage != 'undefined' && localStorage.getItem("dataPannier") != null) {
                    tableauPannier = JSON.parse(localStorage.getItem("dataPannier"));
                    const findProduct = tableauPannier.find((product) =>
                        kanap._id === product._id && kanap.color === product.color
                    )
                    if (findProduct) {
                        findProduct.quantity = numberKanap;
                        localStorage.setItem("dataPannier", JSON.stringify(tableauPannier))
                        // et j'informe le clients de la quantité de produits dans sont panier
                        document.querySelector(".item__content__settings__quantity > label").textContent =
                            `Vous avez ${numberKanap} ${kanap.name} ${kanap.color} dans le pannier`

                    } else {
                        //Et si le produit existe pas je le push dans le tableau
                        tableauPannier.push(kanap)
                        localStorage.setItem("dataPannier", JSON.stringify(tableauPannier))
                        document.querySelector(".item__content__settings__quantity > label").textContent =
                            `Vous avez ${numberKanap} ${kanap.name} ${kanap.color} dans le pannier`
                    }
                } else {
                    // Permet de crée le premier produit
                    tableauPannier.push(kanap)
                    localStorage.setItem("dataPannier", JSON.stringify(tableauPannier))
                    document.querySelector(".item__content__settings__quantity > label").textContent =
                        `Vous avez ${numberKanap} ${kanap.name} ${kanap.color} dans le pannier`
                }
                // tableauPannier.push(kanap);
                //Je stock dans le local storage pour récupérer les infos dans cart.js
                // localStorage.setItem("dataPannier", JSON.stringify(tableauPannier));
            }
        console.log( "tableauPannier qui est envoyé dans le local Storage : ", tableauPannier)
            totalProduct();
            totalProductDisplay();
        }
    )
};


fetchDataProduct()
    .then(() => productDisplay())
    .then(() => onChangeColor())
    .then(() => addToCart())

