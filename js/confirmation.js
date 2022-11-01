const orderId = getOrderId()
displayOrderId(orderId)
clearLocalStorage()

/////// récupération du numéro de commande ////////

function getOrderId() {
const searchLocation = window.location.search
const urlParameters = new URLSearchParams(searchLocation)
return urlParameters.get("orderId")
}

////// affichage du numéro de commande /////////

function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

///////// suppression des articles du localStorage //////////////

function clearLocalStorage() {
    const localStorage = window.localStorage
    localStorage.clear()
}