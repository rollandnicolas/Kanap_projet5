var kanaps = {}
var basketItems = JSON.parse(localStorage.getItem('kanapBasketItems'));
var totalPrice = 0
for (let i = 0; i < basketItems.length; i++) {
    displayItem(basketItems[i])
}

displayTotalQuantity(basketItems)

var totalPrice = 0
displayTotalPrice()


const orderButton = document.getElementById("order")
orderButton.addEventListener("click", (e) => submitForm(e))

///// fonction principale ////////////

function kanapBasketItems(kanap, item) {
    if (typeof kanaps[kanap._id] == "undefined") {
        kanaps[kanap._id] = kanap
    }
    const { altTxt, imageUrl, name, price } = kanap
    const article = makeArticle(item)

    makeDivImage(imageUrl, altTxt, article)
    const divContent = makeDivContent(article)
    const divContentDescription = makeDivContentDescription(divContent)
    makeName(name, divContentDescription)
    makeColor(item, divContentDescription)
    makePrice(price, divContentDescription)

    const divContentSettings = makeDivContentSettings(divContent)
    const divContentSettingsQuantity = makeDivContentSettingsQuantity(item, divContentSettings)
    makeQuantity(item, divContentSettingsQuantity)
    makeInput(item, divContentSettingsQuantity)
    makeDivContentSettingsDelete(item, divContentSettings)
    calculTotalPrice(item, price)
    displayTotalPrice()
}

function displayItem(item) {
    fetch(`http://localhost:3000/api/products/${item.id}`)
        .then(response => response.json())
        .then((res) => {
            kanapBasketItems(res, item)
        })
}
 
////// Creation des articles, div, image, etc... /////////////////////

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    const section = document.getElementById("cart__items")
    section.appendChild(article)
    return article
}

function makeDivImage(imageUrl, altTxt, article) {
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
    article.appendChild(divImage)
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    divImage.appendChild(image)
}

function makeDivContent(article) {
    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")
    article.appendChild(divContent)
    return divContent
}

function makeDivContentDescription(divContent) {
    const divContentDescription = document.createElement("div")
    divContentDescription.classList.add("cart__item__content__description")
    divContent.appendChild(divContentDescription)
    return divContentDescription
}

function makeName(name, divContent) {
    const h2 = document.createElement("h2")
    h2.textContent = name
    divContent.appendChild(h2)
}

function makeColor(item, divContent) {
    const p1 = document.createElement("p")
    p1.textContent = item.color
    divContent.appendChild(p1)
}

function makePrice(price, divContent) {
    const p2 = document.createElement("p")
    p2.textContent = price + " €"
    divContent.appendChild(p2)
}

function makeDivContentSettings(divContent) {
    const divContentSettings = document.createElement("div")
    divContentSettings.classList.add("cart__item__content__settings")
    divContent.appendChild(divContentSettings)
    return divContentSettings
}

function makeDivContentSettingsQuantity(item, divContentSettings) {
    const divContentSettingsQuantity = document.createElement("div")
    divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")
    divContentSettings.appendChild(divContentSettingsQuantity)
    return divContentSettingsQuantity
}

function makeQuantity(item, divContentSettingsQuantity) {
    const quantite = document.createElement("p")
    quantite.textContent = "Qté : "
    divContentSettingsQuantity.appendChild(quantite)
}

function makeInput(item, divContentSettingsQuantity) {
    const input = document.createElement("input")
    input.id = "qty-" + item.id + '-' + item.color
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("change", () => updateQuantityAndPrice(item))
    divContentSettingsQuantity.appendChild(input)
}

/////// bouton "supprimer" ////////////

function makeDivContentSettingsDelete(item, divContentSettings) {
    const divContentSettingsDelete = document.createElement("div")
    divContentSettingsDelete.classList.add("cart__item__content__settings__delete")
    divContentSettingsDelete.addEventListener("click", () => deleteItem(item))
    divContentSettings.appendChild(divContentSettingsDelete)
    const pItem = document.createElement("p")
    pItem.classList.add("deleteItem")
    pItem.textContent = "Supprimer"
    divContentSettingsDelete.appendChild(pItem)
}

function deleteItem(item) {
    console.log("item to delete", item)
    let index = 0
    for (index; index < basketItems.length; index++) {
        if (basketItems[index].id === item.id && basketItems[index].color === item.color) {
            break;
        }
    }
    basketItems.splice(index, 1)
    localStorage.setItem('kanapBasketItems', JSON.stringify(basketItems))
    displayTotalQuantity(basketItems)
    updateTotalPrice(basketItems)
    console.log("localStorage updated")
    const articleToDelete = document.querySelector("[data-id=" + "\"" + item.id + "\"" + "][data-color=" + "\"" + item.color + "\"" + "]")
    articleToDelete.parentNode.removeChild(articleToDelete)
}

///// calcul nombre total d'articles + prix total ///////////////

function displayTotalQuantity(basket) {
    var total = 0
    for (let i = 0; i < basket.length; i++) {
        total += basket[i].quantity
    }
    const totalQuantity = document.getElementById("totalQuantity")
    totalQuantity.textContent = total
}

function calculTotalPrice(item, price) {
    totalPrice += item.quantity * price
}

function displayTotalPrice() {
    const displayTotalPrice = document.getElementById("totalPrice")
    displayTotalPrice.textContent = totalPrice
}

function updateTotalPrice(basketItems) {
    var total = 0
    for (let i = 0; i < basketItems.length; i++) {
        total += basketItems[i].quantity * kanaps[basketItems[i].id].price
    }
    const totalQuantity = document.getElementById("totalPrice")
    totalQuantity.textContent = total
}

function updateQuantityAndPrice(item) {
    let qty = Number(document.getElementById("qty-" + item.id + '-' + item.color).value)
    console.log("Updating basket item id : " + item.id + ", color : " + item.color + " to quantity " + qty)
    for (let i = 0; i < basketItems.length; i++) {
        if (basketItems[i].id === item.id && basketItems[i].color === item.color) {
            basketItems[i].quantity = qty
            break;
        }
    }
    localStorage.setItem('kanapBasketItems', JSON.stringify(basketItems))

    displayTotalQuantity(basketItems)
    updateTotalPrice(basketItems)
}

/////////////////// FORMULAIRE //////////////////////

function submitForm(e) {
    e.preventDefault()
    if (basketItems.length === 0) {
        alert("Votre panier est vide")
        return
    }
        if (
            (firstNameErrorMsg.innerHTML.length > 0 || firstName.value.length == 0)|| 
            (lastNameErrorMsg.innerHTML.length > 0 || lastName.value.length == 0)||
            (addressErrorMsg.innerHTML.length > 0 || address.value.length == 0)||
            (cityErrorMsg.innerHTML.length > 0 || city.value.length == 0)||
            (emailErrorMsg.innerHTML.length > 0 || email.value.length == 0)
           ) {
            alert("le formulaire n'est pas correctement ou totalement rempli")
            return;
        }
        
        const objectToApi = makeRequestObject()

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: objectToApi,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            window.location.href = "/html/confirmation.html" + "?orderId=" + orderId
            return console.log(data)
        })
        .catch((e) => { console.log(e) })
}

//// utilisation des regex ////////////////

let valueFirstname, valueLastName, valueAddress, valueCity, valueEmail;

firstName.addEventListener("input", function (e) {
    valueFirstname;
    if (e.target.value.length == 0) {
        firstNameErrorMsg.innerHTML = "le champ prénom n'est pas rempli"
        valueFirstname = null;
    }
    else if (e.target.value.length < 2 || e.target.value.length > 25) {
        firstNameErrorMsg.innerHTML = "le prénom doit contenir entre 2 et 25 caractères"
        valueFirstname = null
    }
    if (e.target.value.match(/^[a-z A-Z]{2,25}$/)) {
        firstNameErrorMsg.innerHTML = ""
        valueFirstname = e.target.value
    }
    if (
        !e.target.value.match(/^[a-z A-Z]{2,25}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 25) {
        firstNameErrorMsg.innerHTML = "ce champ ne doit pas contenir de caractères spéciaux, accent, ou chiffre";
        valueFirstname = null;
    }
});

lastName.addEventListener("input", function (e) {
    valueLastName;
    if (e.target.value.length == 0) {
        lastNameErrorMsg.innerHTML = "le champ nom n'est pas rempli"
        valueLastname = null;
    }
    else if (e.target.value.length < 2 || e.target.value.length > 25) {
        lastNameErrorMsg.innerHTML = "le nom doit contenir entre 2 et 25 caractères"
        valueLastname = null
    }
    if (e.target.value.match(/^[a-z A-Z]{2,25}$/)) {
        lastNameErrorMsg.innerHTML = ""
        valueLastname = e.target.value
        console.log("succes")
    }
    if (
        !e.target.value.match(/^[a-z A-Z]{2,25}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 25) {
        lastNameErrorMsg.innerHTML = "ce champ ne doit pas contenir de caractères spéciaux, accent, ou chiffre";
        valueLastname = "null";
    }
});

address.addEventListener("input", function (e) {
    valueAddress;
    if (e.target.value.length == 0) {
        AddressErrorMsg.innerHTML = "le champ nom n'est pas rempli"
        valueAddress = null;
    }
    else if (e.target.value.length < 3 || e.target.value.length > 35) {
        addressErrorMsg.innerHTML = "l'adresse doit contenir des chiffres puis des lettres"
        valueAddress = null
    }
    if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) {
        addressErrorMsg.innerHTML = ""
        valueAddress = e.target.value
        console.log("succes")
    }
    if (
        !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/) &&
        e.target.value.length > 3 &&
        e.target.value.length < 35) {
        addressErrorMsg.innerHTML = "ce champ doit commencer par des chiffres puis des lettres, caractères spéciaux et accents invalides";
        valueAddress = "null";
    }
});

city.addEventListener("input", function (e) {
    valueCity;
    if (e.target.value.length == 0) {
        cityErrorMsg.innerHTML = "le champ ville n'est pas rempli" 
        valueCity = null;
        console.log(valueFirstname)
    }
    else if (e.target.value.length < 2 || e.target.value.length > 25) {
        cityErrorMsg.innerHTML = "la ville doit contenir entre 2 et 25 caractères" 
        valueCity = null
    }
    if (e.target.value.match(/^[a-z A-Z]{2,25}$/)) {
        cityErrorMsg.innerHTML = ""
        valueCity = e.target.value
        console.log("succes")
    }
    if (
        !e.target.value.match(/^[a-z A-Z]{2,25}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 25) {
        cityErrorMsg.innerHTML = "ce champ ne doit pas contenir de caractères spéciaux, accent, ou chiffre";
        valueCity = "null";
    }
});

email.addEventListener("input", function (e) {
    if (e.target.value.length == 0) {
        emailErrorMsg.innerHTML = "champ vide";
        valueEmail = null;
        console.log(valueEmail)
        console.log("coucou")
    }

    else if (e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailErrorMsg.innerHTML = "";
        valueEmail = e.target.value;
        console.log(valueEmail)
    }
    if (!e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
        !e.target.value.length == 0) {
        emailErrorMsg.innerHTML = "email non valide, exemple valide: jack@outlook.fr"
        valueEmail = null;
        console.log(valueEmail)
    }
});

////// création et envoi des données lors de la validation du formulaire //////

function makeRequestObject() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    const contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    }

    const products = getIdsForConfirmation()
    const objectToApi = JSON.stringify({ contact, products })
    return objectToApi
}

function getIdsForConfirmation(item) {
    console.log(basketItems)
    let products = []
    for (let i = 0; i < basketItems.length; i++) {
        products.push(basketItems[i].id)
    }
    return products
}
