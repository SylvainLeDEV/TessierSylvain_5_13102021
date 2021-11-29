window.onload = function () {

    const product = document.querySelector("#cart__items")


    const pannierDisplay = () => {

        //On récupère les information du localStorage
        if (typeof localStorage !== 'undefined' && localStorage.getItem("dataPannier") !== null) {
           dataPannier = JSON.parse(localStorage.getItem("dataPannier"));
            console.log("dataPannier dans le localStorage: ", dataPannier)

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
            if (dataPannier.length !== 0) {
// Pour supprimer une article------------------------------------
                const functionDeleteItem = () => {
                    const deleteItem = document.querySelectorAll('p.deleteItem')
                    console.log(" bouton supprimé : ", deleteItem)
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

//Calcule du prix total et du nombre d'articles total -------------------------
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
                    //Affichage résultat d'article total et je réactulise le totalProduct dans le localStorage.
                    localStorage.setItem("totalProduct", JSON.stringify(articleTotal))
                    totalQuantity.textContent = articleTotal;
                    // console.log(articleTotal)

//Additionner les prix qu'il y a dans la variable "PrixTotalPanier" avec reduce.
                    const reducerForPrix = (previousValue, currentValue) => previousValue + currentValue;
                    const prixTotal = prixTotalPanier.reduce(reducerForPrix, 0);
                    //J'affiche le résultat du prix total
                    totalPrice.textContent = prixTotal.toFixed(2);
                    // console.log(prixTotal)
                    localStorage.setItem("totalPrice", prixTotal.toFixed(2));

                }

// Je modifie la quatité dans le panier-----------------------
                const changeQuantity = () => {
                    const inputQuantity = document.querySelectorAll("input.itemQuantity");
                    for (let q = 0; q < inputQuantity.length; q++) {
                        // console.log( "Les input de quantité 'change'", inputQuantity[q])

                        inputQuantity[q].addEventListener('change', (e) => {
                            let valueQuantity = parseInt(e.target.value);
                            // console.log(valueQuantity)
                            if (valueQuantity === 0) {
                                alert("Cliquez sur supprimer pour retirer l'article")

                            } else if (valueQuantity > 100) {
                                alert("Pas plus de 100 articles dans le panier")

                            }
                            if (valueQuantity !== 0 && valueQuantity <= 100) {
                                dataPannier[q].quantity = parseInt(valueQuantity);
                                localStorage.setItem("dataPannier", JSON.stringify(dataPannier))

                                document.querySelectorAll(".cart__item__content__settings__quantity > p")[q].textContent = 'Qté : ' + valueQuantity;
                                document.querySelector("#totalQuantity").textContent = valueQuantity;
                                functionPrixTotalPanier();
                            }

                        })
                    }

                }
                functionPrixTotalPanier();
                changeQuantity();
                functionDeleteItem();
            } else {
                localStorage.clear();
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

    //------------------- Formulaire --------------------------

    const inputCommander = document.getElementById("order");
    //FirstNam  + FirstName msg err----
    let textPrenom = document.getElementById("firstName");
    let textPrenomErrorMsg = document.getElementById("firstNameErrorMsg");
    //Nom + message d'erreur-----
    let textNom = document.getElementById("lastName");
    let textNomErrorMsg = document.getElementById("lastNameErrorMsg");
    //Adresse + message d'erreur ----
    let textAdresse = document.getElementById("address");
    let textAdresseErrorMsg = document.getElementById("addressErrorMsg");
    //Ville + MSG erreur ------
    let textVille = document.getElementById("city");
    let textVilleErrorMsg = document.getElementById("cityErrorMsg");
    //Email.. ------------
    let textEmail = document.getElementById("email");
    let textEmailErrorMsg = document.getElementById("emailErrorMsg");

    //--------------------------------------------------------------------------------
// Je remet 2 fois la condition pour que ça soit plus compréhensible.
    inputCommander.addEventListener('click', (e) => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem("dataPannier") !== null) {
            e.preventDefault();

//Class permet de crée un objet (Peut-etre pas utiles pour ce projet vu qu'il y a que 1 object)
            class Formulaire {
                constructor() {
                    this.firstName = textPrenom.value;
                    this.lastName = textNom.value;
                    this.address = textAdresse.value;
                    this.city = textVille.value;
                    this.email = textEmail.value;
                }
            }

//Appel de l'instance de class Formulaire pour crée un object.
            const formulaireValue = new Formulaire();

// ------------------- VALIDATION FORMULAIRE avec RegEx---------------------//
//Les expressions régulières sont des schémas ou des motifs utilisés pour effectuer des recherches et des remplacements dans des chaines de caractères.
// Expression de function qui va nous permettre de réetuliser la regEx 3 fois.
            const regExFirstNameLastNameVille = (value) => {
                return /^([A-Za-z]{3,20})?((-){0,1})?([A-Za-z]{3,20})$/.test(value)
            }
            const regExEmail = (value) => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)
            }
            //Pour la france il existe des regEx pour tous les pays
            const regExAdresse = (value) => {
                return /^[A-Za-z0-9 \s]{3,40}$/.test(value)
            }

            function firstNameControle() {
                const firstName = formulaireValue.firstName
                if (regExFirstNameLastNameVille(firstName)) {
                    return true;
                } else {
                    return false;
                }
            }

            function lastNameControle() {
                const lastName = formulaireValue.lastName
                if (regExFirstNameLastNameVille(lastName)) {
                    return true;
                } else {
                    return false;
                }
            }

            function adresseControle() {
                const adresse = formulaireValue.address
                if (regExAdresse(adresse)) {
                    return true;
                } else {
                    return false;
                }
            }

            function villeNameControle() {
                const ville = formulaireValue.city
                if (regExFirstNameLastNameVille(ville)) {
                    return true;
                } else {
                    return false;
                }
            }

            function emailControle() {
                const email = formulaireValue.email
                if (regExEmail(email)) {
                    return true;
                } else {
                    return false;
                }
            }

            if (firstNameControle()) {
                textPrenomErrorMsg.style.color = "green";
                textPrenomErrorMsg.textContent = "Prénom valide";
            } else {
                textPrenomErrorMsg.style.color = "Red";
                textPrenomErrorMsg.textContent = "Les chiffre ne sont pas autorisé.Le symbole ' - ' est uniquement autorisé. Ne pas dépasser les 20 caractères et minimum 3 caractères";
            }
            if (lastNameControle()) {
                textNomErrorMsg.style.color = "green";
                textNomErrorMsg.textContent = "Nom valide";
            } else {
                textNomErrorMsg.style.color = "Red";
                textNomErrorMsg.textContent = "Les chiffre ne sont pas autorisé. Ne pas dépasser les 20 caractères minimum 3 caractères";
            }
            if (adresseControle()) {
                textAdresseErrorMsg.style.color = "green";
                textAdresseErrorMsg.textContent = "Adresse valide";
            } else {
                textAdresseErrorMsg.style.color = "Red";
                textAdresseErrorMsg.textContent = "L'adresse doit contenir que des lettres sans ponctuation et chiffres"
            }
            if (villeNameControle()) {
                textVilleErrorMsg.style.color = "green";
                textVilleErrorMsg.textContent = "Ville valide";
            } else {
                textVilleErrorMsg.style.color = "Red";
                textVilleErrorMsg.textContent = "Les chiffre ne sont pas autorisé. Ne pas dépasser les 20 caractères minimum 3 caractères";
            }
            if (emailControle()) {
                textEmailErrorMsg.style.color = "green"
                textEmailErrorMsg.textContent = "Email valide";
            } else {
                textEmailErrorMsg.style.color = "Red";
                textEmailErrorMsg.textContent = "Veuillez respecter le format e-mail exemple : johnDoe@gmail.fr";
            }


// ------------------- FIN VALIDATION FORMULAIRE ---------------------//
            if (firstNameControle() && lastNameControle() && villeNameControle() && adresseControle() && emailControle() && dataPannier !== null) {
                localStorage.removeItem("Formulaire")
                localStorage.setItem("Formulaire", JSON.stringify(formulaireValue))

//Envoyer les produits et les data du formulaire au serveur
                // Je parcours les id dans dataPanier et je les push dans arrayID pour envoyer uniquement les id
                let arrayID = []
                dataPannier.forEach((x) => {
                    arrayID.push(x._id);
                });

                const dataAEnvoyer = {
                    'products': arrayID,
                    'contact': formulaireValue
                }
                console.log("Données envoyer à l'API : ", dataAEnvoyer)
// Envoyer l'objet avec la method POST.
                const envoyerData = fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: JSON.stringify(dataAEnvoyer),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                let response;
                envoyerData
                    .then(async (res) => {
                        response = await res.json()
                        console.log(' response :', response)
                        console.log(response.orderId)
                        window.location.href = "http://localhost:63342/TessierSylvain_5_13102021/front/html/confirmation.html?_orderId=" + response.orderId;
                    })
                    .catch((e) => {
                        console.log(e)
                    });

                    console.log(response.orderId)
            }
        } else {
            e.preventDefault()
            document.querySelector("#cartAndFormContainer > h1").innerHTML =
                `
                   <h1>Choisissez des articles</h1>
                    `
        }
    });

//Stock dans le localStorage pour garder les information de la personne pour ne pas tout réecrire
    if (localStorage.getItem("Formulaire") !== null) {
        //On récupére les data du formulaire dans localStorage pour les injecter dans le formulaire
        const dataLocalStorageObject = JSON.parse(localStorage.getItem("Formulaire"))

        //Fonction pour garder les champs du formulaire rempli.
        function inputRempliParLocalStorage(input) {
            document.querySelector(`#${input}`).value = dataLocalStorageObject[input];
        }

        inputRempliParLocalStorage("firstName")
        inputRempliParLocalStorage("lastName")
        inputRempliParLocalStorage("address")
        inputRempliParLocalStorage("city")
        inputRempliParLocalStorage("email")
        // console.log(dataLocalStorageObject);
    }


    //FIN du onload
}


