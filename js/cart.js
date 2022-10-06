var basketItems = JSON.parse(localStorage.getItem('kanapBasketItems'));
console.log(basketItems);

const cart = []

function kanapBasketItems(kanap) {
    const { altTxt, colors, description, imageUrl, name, price, id } = kanap
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
}
console.log(kanapBasketItems)


takeFromLocalstorage()
cart.forEach((item) => displayItem (item))


fetch(`http://localhost:3000/api/products/${item}`)
.then(response => response.json())
.then((res) => kanapBasketItems(res))




function takeFromLocalstorage()
   const numberOfItems = localStorage.length
    for (let j = 0; j < numberOfItems; j++) {
        const item = localStorage.getItem(localStorage.key(j))
    console.log("objet à la position", j, "est", item)
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
}


function displayItem(item) {
    const article = makeArticle(item)
    displayArticle(article)
    console.log(article)
    const image = makeImage(item)
}

function displayArticle(article) {
    document.getElementById("cart__item").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    //article.dataset.id = item.id
    //article.dataset.color = item.color
    return article
}

function makeImage(item) {
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    return image
}

const searchLocation = window.location.search
const item = localStorage.getItem("item")




  
/*
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

/*function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}
*/