window.onload = function () {
    const product = document.querySelector("#cart__items")
    if (typeof localStorage != 'undefined' && localStorage.getItem("dataPannier") != null) {
        dataPannier = JSON.parse(localStorage.getItem("dataPannier"));
        console.log(dataPannier)
    }

    const pannierDisplay = () => {

        product.innerHTML = dataPannier.map((pannier) =>

            `
        <article class="cart__item" data-id="${pannier._id}">
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
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${pannier.amount}">
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


    const supprimer = document.querySelectorAll(".deleteItem")[0];
    supprimer.addEventListener('click', storage);

    function storage(event) {
        localStorage.removeItem("dataPannier");
        window.location.reload();
        console.log(event)
    }

}



