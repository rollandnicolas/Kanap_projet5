const searchLocation = window.location.search
const urlParameters = new URLSearchParams(searchLocation)
const id = urlParameters.get("id")

fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then((res) => dataPerProduct(res))

function dataPerProduct(kanap) {
    /*const altTxt = kanap.altTxt
    const colors = kanap.colors
    const description = kanap.description
    const imageUrl = kanap.imageUrl
    const name = kanap.name
    const proice = kanap.price
    const _id = kanap._id*/
    const { altTxt, colors, description, imageUrl, name, price, _id } = kanap
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const recip = document.querySelector(".item__img")
    recip.appendChild(image)
}
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}


