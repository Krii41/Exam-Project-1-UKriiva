const cartItems = document.getElementById("cart-items");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCartItems(item) {

    const article = document.createElement("article");
    const imgWrapper = document.createElement("div");
    const img = document.createElement("img");

    article.className = "cart-item grid";
    imgWrapper.className = "cart-item-image";
    img.src = item.image.url;
    img.alt = item.title;

    imgWrapper.appendChild(img);

    const title = document.createElement("h2");
    const price = document.createElement("p");

    title.className = "cart-item-title";
    title.textContent = item.title;

    price.className = "item-price";
    price.textContent = `$ ${item.price}`;

    

    const controls = document.createElement("div");
    const minusBtn = document.createElement("button");
    const qty = document.createElement("span");
    const plusBtn = document.createElement("button");

    controls.className = "cart-controls flex";

    minusBtn.className = "qty-btn";
    minusBtn.textContent = "-";
    minusBtn.setAttribute("aria-label", "Decrease");

    qty.className = "item-qty";
    qty.textContent = item.quantity;

    plusBtn.className = "qty-btn";
    plusBtn.textContent = "+";
    plusBtn.setAttribute("aria-label", "Decrease");

    controls.append(minusBtn, qty, plusBtn);

    const removeBtn = document.createElement("button");
    removeBtn.className = "item-remove";
    removeBtn.innerHTML = "&times";
    removeBtn.setAttribute("aria-label", "Remove item from cart");

    plusBtn.addEventListener("click", () => {
        item.quantity++;
        saveCart();
        renderCart();
    });

    minusBtn.addEventListener("click", () => {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            removeItem(item.id);
        }
        saveCart();
        renderCart();
    });

    removeBtn.addEventListener("click", () => {
        removeItem(item.id);
        saveCart();
        renderCart();
    });

    article.append(imgWrapper, title, price, controls, removeBtn);

    return article;
    
}

function renderCart() {
    cartItems.innerHTML = "";

    cart.forEach(item => {
        const element = renderCartItems(item);
        cartItems.appendChild(element);
    });

    updateTotals();
}


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(id) {
    cart = cart.filter(item => item.id !==id);
}

function updateTotals() {
    const subtotal = cart.reduce (
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("cart-subtotal").textContent = `$ ${subtotal.toFixed(2)}`;
    document.getElementById("cart-total").textContent = `$ ${subtotal.toFixed(2)}`;
}

renderCart();