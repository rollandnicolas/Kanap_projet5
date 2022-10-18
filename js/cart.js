var kanaps = {}
var basketItems = JSON.parse(localStorage.getItem('kanapBasketItems'));
var totalPrice = 0
for (let i = 0; i < basketItems.length; i++) {
    displayItem(basketItems[i])
}


displayTotalQuantity(basketItems)

// const cart = []
var totalPrice = 0
displayTotalPrice()


const orderButton = document.getElementById("order")
orderButton.addEventListener("click", (e) => submitForm(e))


/*  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>Vert</p>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article> */

function kanapBasketItems(kanap, item) {
    if (typeof kanaps[kanap._id] == "undefined") {
        kanaps[kanap._id] = kanap
    }
    const { altTxt, colors, description, imageUrl, name, price, id } = kanap
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


/* function takeFromLocalstorage() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
} */

function displayItem(item) {
    fetch(`http://localhost:3000/api/products/${item.id}`)
        .then(response => response.json())
        .then((res) => {
            // a ce stade, on : 
            // - item : un item du local storage
            // - res : le product retourne par l'API 
            kanapBasketItems(res, item)
        })

}


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
    // p1.id = 'color-' + item.id + '-' + item.color
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

/* function totalQuantity(item) {
    quantity += item.quantity
    //console.log(quantity)
} */

function displayTotalQuantity(basket) {
    var total = 0
    for (let i = 0; i < basket.length; i++) {
        //console.log(basket[i].quantity)
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
    console.log(basketItems)
    if (basketItems.length === 0) {
        alert("Votre panier est vide")
        return
    }

    //if (emailWrong()) return

    const form = document.querySelector(".cart__order__form")
    const objectToApi = makeRequestObject()

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: objectToApi,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .then((data) => { console.log(data)} )
        .catch((e) => { console.log(e)})
}

//function validateFormulary() 

function emailWrong() {
    const email = document.getElementById("email")
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (regex.test(email) === false) {
        alert("email invalide")
        return true
    }
    else {
        return false
    }
}

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

    const products = getIdsFromLocalStorage()

    const objectToApi = JSON.stringify({ contact, products })


    console.log(objectToApi)
    return objectToApi

}

function getIdsFromLocalStorage(item) {
    console.log(basketItems)
    let products = []

    for (let i = 0; i < basketItems.length; i++) {
        console.log(basketItems[i])
        products.push(basketItems[i].id)
 
    }
    console.log(products)
    return products

}





const searchLocation = window.location.search
const item = localStorage.getItem("item")









