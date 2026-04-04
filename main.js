
/* import { initCarousel } from "./js/carousel.js";

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
  await loadComponent("header", "./components/header.html");
  await loadComponent("footer", "./components/footer.html");

  const hasCarousel = await loadComponent(
    "hero-slider",
    "./components/carousel.html"
  );

  if (hasCarousel) {
    initCarousel();
  }
}

initPage(); */

/* import { initCarousel } from "./js/carousel.js";

const BASE_PATH =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? ""
    : "/EXAM-PROJECT-1-UKRIIVA";

function cleanPath(path) {
  return path.replace(/^(\.\/|\.\.\/)+/, "");
}

function fixPaths(container) {
  container.querySelectorAll("[href]").forEach((el) => {
    const href = el.getAttribute("href");

    if (
      href &&
      !href.startsWith("http") &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("tel:") &&
      !href.startsWith("/")
    ) {
      el.setAttribute("href", `${BASE_PATH}/${cleanPath(href)}`);
    }
  });

  container.querySelectorAll("[src]").forEach((el) => {
    const src = el.getAttribute("src");

    if (
      src &&
      !src.startsWith("http") &&
      !src.startsWith("data:") &&
      !src.startsWith("/")
    ) {
      el.setAttribute("src", `${BASE_PATH}/${cleanPath(src)}`);
    }
  });
}

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

    fixPaths(target);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function initPage() {
  await loadComponent("header", "./components/header.html");
  await loadComponent("footer", "./components/footer.html");

  const hasCarousel = await loadComponent(
    "hero-slider",
    "./components/carousel.html"
  );

  if (hasCarousel) {
    initCarousel();
  }
}

initPage();

 */

import { initCarousel } from "./js/carousel.js";

const BASE_PATH = window.location.hostname.includes("github.io")
  ? "/Exam-Project-1-Ukriiva"
  : "";

function cleanPath(path) {
  return path.replace(/^(\.\/|\.\.\/|\/)+/, "");
}

function withBase(path) {
  const clean = cleanPath(path);
  return BASE_PATH ? `${BASE_PATH}/${clean}` : `/${clean}`;
}

function fixPaths(container) {
  container.querySelectorAll("[href]").forEach((el) => {
    const href = el.getAttribute("href");

    if (
      href &&
      !href.startsWith("http") &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("tel:")
    ) {
      el.setAttribute("href", withBase(href));
    }
  });

  container.querySelectorAll("[src]").forEach((el) => {
    const src = el.getAttribute("src");

    if (
      src &&
      !src.startsWith("http") &&
      !src.startsWith("data:")
    ) {
      el.setAttribute("src", withBase(src));
    }
  });
}

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
    fixPaths(target);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function initPage() {
  await loadComponent("header", "./components/header.html");
  await loadComponent("footer", "./components/footer.html");

  const hasCarousel = await loadComponent(
    "hero-slider",
    "./components/carousel.html"
  );

  if (hasCarousel) {
    initCarousel();
  }
}

initPage();