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
    makeColors(colors)
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
    // const p = document.getElementById("#description") marcherait aussi... 
    if (p != null) p.textContent = description
}

function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

function initEventListeners() {
    
    document.getElementById('addToCart').addEventListener('click', function() {
        basketItem = {
            'id' : id,
            'color' : 'Yellow/Black', // recupere l'option selectionnee
            'qty': document.getElementById('quantity').value // recuperer l'option selectionnee          
        }
        console.log(basketItem);
        //basketItems = localStorage.getItems('basket');
                // attention ca ne marche pas si il y en avait pas deja ... 
        // basketItems.push(basketItem)

        // trucs a faire ici
            // si je n'ai pas mis de quantite ? 
            // si je n'ai pas pris de couleur ? 
            // si j'avais deja mis un article dans le panier de cette reference (id) et de cette couleur ? que faire ? incrementer la quantite ? 

    })
}

window.onload = initEventListeners
