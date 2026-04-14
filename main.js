import { initCarousel } from "./js/carousel.js";

async function loadComponent(id, relativePath) {
  const target = document.getElementById(id);
  if (!target) return false;

  try {
    const fileUrl = new URL(relativePath, import.meta.url);
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to load ${fileUrl} (${response.status})`);
    }

    const html = await response.text();
    target.innerHTML = html;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function initPage() {
  
  const hasCarousel = await loadComponent(
    "hero-slider",
    "./components/carousel.html"
  );

  if (hasCarousel) {
    initCarousel();
  }
}

initPage();




// load products to the home page

const API_URL = "https://v2.api.noroff.dev/online-shop";

async function createProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;

    renderLargeProduct(products);
    renderSmallProduct1(products);
    renderSmallProduct2(products);
    renderMysteryCard(products);

  } catch (error) {
    console.error("Failed to create products");
  }
}

createProducts();

// create slots for products

function getSlot(section, slot) {
  return document.querySelector(
    `[data-section="${section}"] [data-slot="${slot}"]`
  );
}

// create product price container


function createPrice(product) {
  const prices = document.createElement("div");
  const price = document.createElement("span");
  const oldPrice = document.createElement("span");

  prices.className = "card-prices";
  price.className = "price";
  price.textContent = `${product.discountedPrice ?? product.price}`;
  oldPrice.className = "old-price";

  if (product.discountedPrice < product.price) {
    oldPrice.textContent = `$ ${product.price}`;
  }

  prices.append(price, oldPrice);
  return prices;
}

// create cards


function createLargeCard(product) {
  const card = document.createElement("div");
  const link = document.createElement("a");
  const img = document.createElement("img");

  card.className = "card-large";
  link.href = `product/index.html?id=${product.id}`;
  img.src = product.image.url;
  img.alt = product.image.alt;

  const prices = createPrice(product);

  link.appendChild(img);
  card.append(link, prices);

  return card;
}

function createSmallCard(product) {
  const card = document.createElement("div");
  const link = document.createElement("a");
  const img = document.createElement("img");

  card.className = "card card-small";
  link.href = `product/index.html?id=${product.id}`;
  img.src = product.image.url;
  img.alt = product.image.alt;

  const prices = createPrice(product);

  link.appendChild(img);
  card.append(link, prices);

  return card;  

}



// render cards

function renderLargeProduct(products) {
  const product = products.find(
    p => p.id === "9be4812e-16b2-44e6-bc55-b3aef9db2b82"
  );

  const slot = document.querySelector(
    '[data-section="featured"] [data-slot="large"]'
  );

  slot.innerHTML = "";
  slot.appendChild(createLargeCard(product));
}

function renderSmallProduct1(products) {
  const product = products.find(
    p => p.id === "f2d44fba-09a7-4ccb-9ceb-a6212bf5c213"
  );

  const slot = document.querySelector(
    '[data-section="featured"] [data-slot="small-1"]'
  );

  slot.innerHTML = "";
  slot.appendChild(createSmallCard(product));
}

function renderSmallProduct2(products) {
  const product = products.find(
    p => p.id === "10d6cc02-b282-46bb-b35c-dbc4bb5d91d9"
  );

  const slot = document.querySelector(
    '[data-section="featured"] [data-slot="small-2"]'
  );

  slot.innerHTML = "";
  slot.appendChild(createSmallCard(product));
}

// render mystery card

function renderMysteryCard(products) {
  const product = products.find(
    p => p.id === "3b43b2e4-62b0-4c02-9166-dffa46a0388c"
  );

  const card = document.querySelector(
    '[data-section="featured"] [data-slot="mystery"]'
  );

  if (!card || !product) return;

  const link = card.querySelector(".card-media");
  const hoverImg = card.querySelector(".card-img.card-img-hover");
  const pricesContainer = card.querySelector(".card-prices");

  link.href = `product/index.html?id=${product.id}`;
  hoverImg.src = product.image.url;
  hoverImg.alt = product.image.alt;
  pricesContainer.innerHTML = "";

  pricesContainer.replaceWith(createPrice(product));

}







  

