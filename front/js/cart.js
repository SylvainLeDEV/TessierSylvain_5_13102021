window.onload = function () {

    const product = document.querySelector("#cart__items")


    const pannierDisplay = () => {

        //On récupère les information du localStorage
        if (typeof localStorage !== 'undefined' && localStorage.getItem("dataPannier") !== null) {
            dataPannier = JSON.parse(localStorage.getItem("dataPannier"));
            console.log("data pannier : ", dataPannier)

            product.innerHTML = dataPannier.map((pannier) =>

                `
        <article class="cart__item" data-id="${pannier._id}" data-color="${pannier.color}">
    <div class="cart__item__img">
        <img src="${pannier.img}" alt="${pannier.alt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
            <h2>${pannier.name} ${pannier.color}</h2>
            <p>${pannier.price} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : ${pannier.quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${pannier.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>
        `
            ).join(" ")
            // Pour supprimer une article
            if (dataPannier.length !== 0) {
                const functionDeleteItem = () => {
                    const deleteItem = document.querySelectorAll('p.deleteItem')

                    for (let i = 0; i < deleteItem.length; i++) {
                        deleteItem[i].addEventListener('click', (e) => {
                            const getId = e.path[4].getAttribute("data-id")
                            const getColor = e.path[4].getAttribute("data-color")
                            console.log(getId + getColor)

                            if (getId === dataPannier[i]._id && getColor === dataPannier[i].color) {
                                dataPannier.splice(i, 1)// Retire l'objet de dataPannier grace a splice
                                localStorage.setItem("dataPannier", JSON.stringify(dataPannier))
                                pannierDisplay();
                            }
                        })
                    }
                };
                functionDeleteItem();
            } else {
                localStorage.clear();
            }


            if (dataPannier.length !== 0) {
                const functionPrixTotalPanier = () => {
                    const totalPrice = document.querySelector("#totalPrice");
                    const totalQuantity = document.querySelector("#totalQuantity")
//Calcul du prix total dans le panier ---
                    let prixTotalPanier = [];
                    let quantityArticleTotal = [];
                    console.log("Varriable prixTotalPanier : ", prixTotalPanier)
                    console.log("Varriable quantityArticleTotal : ", quantityArticleTotal)

//Prendre tous les prix qui se trouve dans le panier
                    for (let t = 0; t < dataPannier.length; t++) {
                        let priceArticleInPanier = dataPannier[t].price;
                        let quantityDeUnArticle = dataPannier[t].quantity;

                        let calculPriceUnArticle = priceArticleInPanier * quantityDeUnArticle

                        //Je mes les prix et articles dans une variable "prixTotalPanier" et "quantityArticleTotal"
                        prixTotalPanier.push(calculPriceUnArticle)
                        quantityArticleTotal.push(quantityDeUnArticle)
                    }
                    //Additionner les prix qu'il y a dans la variable "Quantity Article Total" avec reduce.
//La méthode reduce() applique une fonction qui est un « accumulateur » et qui traite chaque valeur d'une liste (de la gauche vers la droite) afin de la réduire à une seule valeur.
                    const reducerForArticles = (previousValue, currentValue) => previousValue + currentValue;
                    const articleTotal = quantityArticleTotal.reduce(reducerForArticles, 0)
                    //Affichage résultat
                    totalQuantity.textContent = articleTotal;
                    console.log(articleTotal)

//Additionner les prix qu'il y a dans la variable "PrixTotalPanier" avec reduce.
                    const reducerForPrix = (previousValue, currentValue) => previousValue + currentValue;
                    const prixTotal = prixTotalPanier.reduce(reducerForPrix, 0);
                    //J'affiche le résultat du prix total
                    totalPrice.textContent = prixTotal.toFixed(2);
                    console.log(prixTotal)

                }
                    functionPrixTotalPanier();
            } else {
                document.querySelector("#cartAndFormContainer > h1").innerHTML =
                    `
                   <h1>Panier vide</h1>
                 
                    `
                totalPrice.textContent = 0;
                totalQuantity.textContent = 0;
            }
        }
    }
        pannierDisplay();
}


