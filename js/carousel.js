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

