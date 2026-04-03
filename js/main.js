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

/* import { initCarousel } from "./carousel.js";

const basePath = window.location.hostname.includes("github.io")
  ? "/EXAM-PROJECT-1-UKRIIVA"
  : "";

async function loadComponent(id, file) {
  const target = document.getElementById(id);
  if (!target) return false;

  try {
    const response = await fetch(`${basePath}${file}`);
    if (!response.ok) throw new Error(`Failed to load ${file}`);

    const html = await response.text();
    target.innerHTML = html;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
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

initPage(); */