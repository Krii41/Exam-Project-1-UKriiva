import { setupCarousel } from "./js/carousel.js";

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
    setupCarousel();
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

    renderFeaturedProducts(products);
    renderGroupProducts(products);
    renderEditorsProducts(products);
    renderTechProducts(products);
    renderSeasonProducts(products);
    renderMysteryCards(products);

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

function renderCard(section, slotName, product, createFn) {
  const slot = getSlot(section, slotName);
  if (!slot || !product) return;

  slot.innerHTML = "";
  slot.appendChild(createFn(product));
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

function createLargeCardSecondary(product) {
  const card = document.createElement("div");
  const link = document.createElement("a");
  const img = document.createElement("img");

  card.className = "card card-large";
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

function createWideCard(product) {
  const card = document.createElement("div");
  const link = document.createElement("a");
  const img = document.createElement("img");

  card.className = "card card-wide";
  link.href = `product/index.html?id=${product.id}`;
  img.src = product.image.url;
  img.alt = product.image.alt;

  const prices = createPrice(product);

  link.appendChild(img);
  card.append(link, prices);

  return card;  

}

function createWideSmallCard(product) {
  const card = document.createElement("div");
  const link = document.createElement("a");
  const img = document.createElement("img");

  card.className = "card card-wide-small";
  link.href = `product/index.html?id=${product.id}`;
  img.src = product.image.url;
  img.alt = product.image.alt;

  const prices = createPrice(product);

  link.appendChild(img);
  card.append(link, prices);

  return card;  

}

function createTallCard(product) {
  const card = document.createElement("div");
  const link = document.createElement("a");
  const img = document.createElement("img");

  card.className = "card card-tall";
  link.href = `product/index.html?id=${product.id}`;
  img.src = product.image.url;
  img.alt = product.image.alt;

  const prices = createPrice(product);

  link.appendChild(img);
  card.append(link, prices);

  return card;  

}



// render cards featured

function renderFeaturedProducts(products) {
  const large = products.find(
    p => p.id === "9be4812e-16b2-44e6-bc55-b3aef9db2b82"
  );
  const product1 = products.find(
    p => p.id === "f2d44fba-09a7-4ccb-9ceb-a6212bf5c213"
  );
  const product2 = products.find(
    p => p.id === "10d6cc02-b282-46bb-b35c-dbc4bb5d91d9"
  );

  renderCard("featured", "large", large, createLargeCard);
  renderCard("featured", "small-1", product1, createSmallCard);
  renderCard("featured", "small-2", product2, createSmallCard);
}

// render cards group section

function renderGroupProducts(products) {
  const product1 = products.find(
    p => p.id === "7238397e-0ee5-4d5c-9e82-bda666dd2470"
  );
  const product2 = products.find(
    p => p.id === "95dc28de-9ef6-4c67-808b-6431a5de43e8"
  );

  const largeCard = products.find(
    p => p.id === "159fdd2f-2b12-46de-9654-d9139525ba87"
  );

  renderCard("group", "small-1", product1, createSmallCard);
  renderCard("group", "small-2", product2, createSmallCard);
  renderCard("group", "large", largeCard, createLargeCardSecondary);
}

// render editors picks cards

function renderEditorsProducts(products) {
  const product1 = products.find(
    p => p.id === "31e3a66f-2dbe-47ae-b80d-d9e5814f3e32"
  );
  const product2 = products.find(
    p => p.id === "ce5b64e3-440d-46e5-952f-bfdbad8a48d2"
  );
  const largeCard = products.find(
    p => p.id === "3f328f02-715e-477f-9738-7934af4bc5b0"
  );

  renderCard("editors", "small-1", product1, createSmallCard);
  renderCard("editors", "small-2", product2, createSmallCard);
  renderCard("editors", "large", largeCard, createLargeCard);
}

// render tech cards

function renderTechProducts(products) {
  const wide = products.find(
    p => p.id === "f5d453d1-e811-4225-81ac-cee54ef0384b"
  );
  const wideSmall = products.find(
    p => p.id === "5aa2e388-8dfb-4d70-b031-3732d8c6771a"
  );
  const tall1 = products.find(
    p => p.id === "f99cafd2-bd40-4694-8b33-a6052f36b435"
  );
  const tall2 = products.find(
    p => p.id === "f6712e3b-8050-4841-bd64-f332a48f7566"
  );
  const tall3 = products.find(
    p => p.id === "1fd1ddca-0d38-4e41-aa62-a1a7a57cf4b5"
  );

  renderCard("tech", "wide", wide, createWideCard);
  renderCard("tech", "wide-small", wideSmall, createWideSmallCard);
  renderCard("tech", "tall-1", tall1, createTallCard);
  renderCard("tech", "tall-2", tall2, createTallCard);
  renderCard("tech", "tall-3", tall3, createTallCard);
  
}

// render this season cards

function renderSeasonProducts(products) {
  const wideSmall = products.find(
    p => p.id === "5391e16f-d88b-4747-a989-f17fb178459d"
  );
  const small = products.find(
    p => p.id === "c0d245f1-58fa-4b15-aa0c-a704772a122b"
  );

  renderCard("season", "wide-small", wideSmall, createWideSmallCard);
  renderCard("season", "small", small, createSmallCard);
}

// render mystery cards

function renderMysteryCards(products) {
  const featuredProduct = products.find(
    p => p.id === "3b43b2e4-62b0-4c02-9166-dffa46a0388c"
  );
  const editorsProduct = products.find(
    p => p.id === "414f5b60-c574-4a2f-a77b-3956b983495b"
  );
  const seasonProduct = products.find(
    p => p.id === "109566af-c5c2-4f87-86cb-76f36fb8d378"
  );

  updateMysteryCard(getSlot("featured", "mystery"), featuredProduct);
  updateMysteryCard(getSlot("editors", "mystery"), editorsProduct);
  updateMysteryCard(getSlot("season", "mystery"), seasonProduct);

}

function updateMysteryCard(card, product) {
  const link = card.querySelector(".card-media");
  const hoverImg = card.querySelector(".card-img.card-img-hover");
  const pricesContainer = card.querySelector(".card-prices");

  link.href = `product/index.html?id=${product.id}`;
  hoverImg.src = product.image.url;
  hoverImg.alt = product.image.alt;

  pricesContainer.innerHTML = "";
  pricesContainer.appendChild(createPriceContent(product));
}

function createPriceContent(product) {
  const fragment = document.createDocumentFragment();
  const price = document.createElement("span");
  const oldPrice = document.createElement("span");

  price.className = "price";
  price.textContent = `$ ${product.discountedPrice ?? product.price}`;
  oldPrice.className = "old-price";

  if (product.discountedPrice < product.price) {
    oldPrice.textContent = `$ ${product.price}`;
  }

  fragment.append(price, oldPrice);
  return fragment;
}







  

