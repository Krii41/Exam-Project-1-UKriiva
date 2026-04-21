import { updateCartBadge } from "../main.js";

function renderCheckoutTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  document.getElementById("checkout-total").innerText = `$ ${total.toFixed(2)}`;
}

renderCheckoutTotal();

const orderCompleated = document.getElementById("order-compleated");

if (orderCompleated) {
    orderCompleated.addEventListener("click", () => {
        localStorage.removeItem("cart");
        updateCartBadge();
        window.location.href = "../checkout/success.html";
    })
}