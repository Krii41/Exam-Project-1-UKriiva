/* import { initCarousel } from "./carousel.js";

async function loadComponent(id, file) {
    const target = document.getElementById(id);
    if (!target) return false;

    const response = await fetch(file);
    const html = await response.text();
    target.innerHTML = html;
    return true;
}

async function initPage() {
    await loadComponent("header", "../components/header.html");
    await loadComponent("footer", "../components/footer.html");

    const hasCarousel = await loadComponent(
        "hero-slider",
        "../components/carousel.html"
    );

    if (hasCarousel) {
        initCarousel();
    }
}

initPage();
 */

/* import { initCarousel } from "./carousel.js";

const BASE_PATH = "/EXAM-PROJECT-1-UKRIIVA";

async function loadComponent(id, file) {
  const target = document.getElementById(id);
  if (!target) return false;

  try {
    const response = await fetch(`${BASE_PATH}${file}`);
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

import { initCarousel } from "./carousel.js";

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
  await loadComponent("header", "../components/header.html");
  await loadComponent("footer", "../components/footer.html");

  const hasCarousel = await loadComponent(
    "hero-slider",
    "../components/carousel.html"
  );

  if (hasCarousel) {
    initCarousel();
  }
}

initPage();