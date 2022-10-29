const searchLocation = window.location.search
const urlParameters = new URLSearchParams(searchLocation)
const id = urlParameters.get("id")

if (id != null ) {
}

fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then((res) => dataPerProduct(res))

function dataPerProduct(kanap) {
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    makeDivImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeDivImage(imageUrl, altTxt) {
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

const button = document.getElementById('addToCart')
if (button != null) {
    button.addEventListener("click", (e) => {
        var basketItems = JSON.parse(localStorage.getItem('kanapBasketItems'));
        if (!basketItems) basketItems = [];
        const color = document.getElementById("colors").value
        const quantity = document.getElementById("quantity").value

        if (color == null || color === "" || quantity == null || quantity == 0 ) {
            alert("Veuillez sélectionner une couleur et une quantité")
            return;
        }  

        let found = false;
        for (let i = 0 ; i < basketItems.length; i++) {
            if (basketItems[i].id == id && basketItems[i].color == color) {
                found = true
                basketItems[i].quantity += Number(quantity)            
                break;
            }
        }
        if (!found) {
            const data = {
                id : id,
                color : color,
                quantity : Number(quantity)    
            }
            basketItems.push(data);
        }

        // document.getElementById('addToCart').setAttribute = ('disabled', 'disabled');
        // document.getElementById('addToCart').setAttribute = ('disabled', '');
        
        // JQuery
        // $('#addToCard').disabled();

        // fin de la condition        
        localStorage.setItem("kanapBasketItems", JSON.stringify(basketItems)) // JSON.parse
        window.location.href = "cart.html"                
    })
}
