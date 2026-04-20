export async function setupCarousel() {
    await loadCarouselProducts();
    initCarousel();
}

const API_URL = "https://v2.api.noroff.dev/online-shop";


const carouselProductIds = [ 
    "f7bdd538-3914-409d-bd71-8ef962a9a9dd",
    "894ca18f-9725-40b3-9429-1420ee2054da",
    "83111322-05a9-4a93-bc81-7d6b58f1a707"
];

async function loadCarouselProducts() {

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const products = data.data;
        
        const selectedProducts = carouselProductIds
           .map((id) => products.find((product) => product.id === id))
           .filter(Boolean);

        const imageElements = [
            document.getElementById("carousel-product-1"),
            document.getElementById("carousel-product-2"),
            document.getElementById("carousel-product-3")
        ];

        const buttonElements = [
            document.getElementById("slide-btn-1"),
            document.getElementById("slide-btn-2"),
            document.getElementById("slide-btn-3")
        ]
            
        

        selectedProducts.forEach((product, index) => {
            const img = imageElements[index];
            const link = buttonElements[index];

            if (img) {
                img.src = product.image.url;
                img.alt = product.image.alt || product.title;
            }

            if (link) {
                link.href = `product/index.html?id=${product.id}`;
            }
        });

    } catch (error) {
        console.error("Failed to load carousel products");
    }

}

 function initCarousel() {
    document.querySelectorAll(".slider").forEach((slider) => {
        const items = slider.querySelectorAll(".slide");
        const dotContainer = slider.parentElement.querySelector(".dot-container");

        const dotsHtml = Array.from(items, () => {
            return `<span class="dot"></span>`;
        }).join("");

        dotContainer.innerHTML = dotsHtml;

        const dots = dotContainer.querySelectorAll(".dot");
        let currentIndex = 0;
        let intervalId;

        function stopAutoplay() {
            clearInterval(intervalId);
        }

        function startAutoplay() {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                nextSlide();
            }, 7000);
        }

        function showSlide(index) {
            items.forEach((item) => item.classList.remove("selected"));
            dots.forEach((dot) => dot.classList.remove("dot-selected"));

            items[index].classList.add("selected");
            dots[index].classList.add("dot-selected");
        }

        function nextSlide() {
            currentIndex++;

            if (currentIndex >= items.length) {
                currentIndex = 0;
            }

            showSlide(currentIndex);
        }

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                currentIndex = i;
                showSlide(currentIndex);
            });
        });

        showSlide(currentIndex);

        startAutoplay();

        slider.addEventListener("mouseenter", stopAutoplay);
        slider.addEventListener("mouseleave", startAutoplay);
    });
}


