import { setupCarousel } from "./js/carousel.js";
import { renderHomePage } from "./js/catalog.js";

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

    renderHomePage(products);

  } catch (error) {
    console.error(error);
    throw error;
  }
}

const homePageSection = document.querySelector("[data-section]");

if (homePageSection) {
  createProducts();
}


export function updateCartBadge() {
  const badge = document.getElementById("cart-count");

  if(!badge) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  badge.textContent = totalItems;

  if (totalItems === 0) {
    badge.setAttribute("hidden", "");
  } else {
    badge.removeAttribute("hidden");
  }
}

updateCartBadge();












  

