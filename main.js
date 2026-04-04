/* import { initCarousel } from "./js/carousel.js";

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("hero-slider");

  if (slider) {
    initCarousel();
  }
});
 */

 
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
