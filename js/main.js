import { initCarousel } from "./carousel.js";

async function loadComponent(id, file) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

async function initPage() {
    await loadComponent("header", "../components/header.html");
    await loadComponent("footer", "../components/footer.html");
    await loadComponent("hero-slider", "../components/carousel.html");
    initCarousel();
}

initPage();

