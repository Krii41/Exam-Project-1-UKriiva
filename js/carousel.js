console.log("initCarousel started");

export function initCarousel() {
    document.querySelectorAll(".slider").forEach((slider) => {
        const items = slider.querySelectorAll(".slide");
        const dotContainer = slider.parentElement.querySelector(".dot-container");
    
        const dotsHtml = Array.from(items, () => {
            return `<span class="dot"></span>`;
        }).join("");
    
        dotContainer.innerHTML = dotsHtml;
    
        const dots = dotContainer.querySelectorAll(".dot");
    
        function showSlide(index) {
            items.forEach((item) => item.classList.remove("selected"));
            dots.forEach((dot) => dot.classList.remove("dot-selected"));
    
            items[index].classList.add("selected");
            dots[index].classList.add("dot-selected");
        }
    
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                showSlide(i);
            });
        });
    
        showSlide(0);
    });

    
    
}

