const orderId = getOrderId()
displayOrderId(orderId)
clearLocalStorage()

function getOrderId() {
const searchLocation = window.location.search
const urlParameters = new URLSearchParams(searchLocation)
return urlParameters.get("orderId")
console.log(orderId)
}

function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

function clearLocalStorage() {
    const localStorage = window.localStorage
    localStorage.clear()
}