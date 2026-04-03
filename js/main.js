import { initCarousel } from "./carousel.js";

async function loadComponent(id, file) {
    const target = document.getElementById(id);
    if (!target) return false;

    const response = await fetch(file);
    const html = await response.text();
    target.innerHTML = html;
    return true;
}

async function initPage() {
    await loadComponent("header", "/components/header.html");
    await loadComponent("footer", "/components/footer.html");

    const hasCarousel = await loadComponent(
        "hero-slider",
        "/components/carousel.html"
    );

    if (hasCarousel) {
        initCarousel();
    }
}

initPage();

