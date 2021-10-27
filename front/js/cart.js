window.onload = function () {

    const product = document.querySelector("#cart__items")


    //On récupère les information du localStorage
    if (typeof localStorage != 'undefined' && localStorage.getItem("dataPannier") != null) {
        dataPannier = JSON.parse(localStorage.getItem("dataPannier"));
        console.log("data pannier : ", dataPannier)
    }


    const pannierDisplay = () => {

        product.innerHTML = dataPannier.map((pannier) =>

            `
        <article class="cart__item" data-id="${pannier._id}" data-color="${pannier.color}">
    <div class="cart__item__img">
        <img src="${pannier.img}" alt="${pannier.alt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
            <h2>${pannier.name}</h2>
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

    }
    pannierDisplay();

    const functionDeleteItem = (e) => {

        const getId = e.path[4].getAttribute("data-id")
        const getColor = e.path[4].getAttribute("data-color")
        console.log(e)
        console.log(getId + getColor)
        for (const x of dataPannier) {
            if (getId === x._id && getColor === x.color) {
                dataPannier.splice(x, 1)
                localStorage.setItem("dataPannier", JSON.stringify(dataPannier))
                pannierDisplay();
                functionAddEventListener()
            }
        }
    }

    const functionAddEventListener = () => {
        const deleteItem = document.querySelectorAll('p.deleteItem')
        console.log(deleteItem)

        for (let i = 0; i < deleteItem.length; i++) {
            deleteItem[i].addEventListener('click', (e) => {
                functionDeleteItem(e);
            })
        }
    }
    functionAddEventListener();

    //Fonction pour remove les canapé du local.storage + rechercher la page
    function storageRemove(event) {
        localStorage.removeItem("dataPannier");
        window.location.reload();
        console.log(event)
    }

}



