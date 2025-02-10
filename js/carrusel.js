document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel__slide");
    const indicators = document.querySelectorAll(".carousel__indicator");
    const prevButton = document.querySelector(".carousel__prev");
    const nextButton = document.querySelector(".carousel__next");
    const pauseButton = document.querySelector(".carousel__pause");

    let currentIndex = 0;
    let autoPlayInterval;

    function updateCarousel(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
            slide.setAttribute("aria-hidden", i !== index);
            slide.removeAttribute("tabindex");
        });

        indicators.forEach((indicator, i) => {
            indicator.setAttribute("aria-selected", i === index);
        });

        slides[index].setAttribute("tabindex", "0");
        slides[index].focus();
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(currentIndex);
        }, 6000); // Cambia cada 6 segundos
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(currentIndex);
    }

    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel(currentIndex);
    }

    function togglePause() {
        if (pauseButton.getAttribute("aria-pressed") === "false") {
            stopAutoPlay();
            pauseButton.setAttribute("aria-pressed", "true");
            pauseButton.textContent = "Reanudar";
        } else {
            startAutoPlay();
            pauseButton.setAttribute("aria-pressed", "false");
            pauseButton.textContent = "Pausar";
        }
    }

    // Event listeners para os botóns de anterior e seguinte
    prevButton.addEventListener("click", goToPrevSlide);
    nextButton.addEventListener("click", goToNextSlide);

    // Event listener para o botón de pausar/reanudar
    pauseButton.addEventListener("click", togglePause);

    // Event listener para as teclas do teclado
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            goToPrevSlide(); //  Frecha izquierda para ir á  diapositiva anterior
        } else if (event.key === "ArrowRight") {
            goToNextSlide(); //  Frecha derecha para ir a á diapositiva seguinte
        } else if (event.key === " ") { // Barra espaciadora
            event.preventDefault(); // Evita o comportamento por defecto (desprazamento da  páxina)
            togglePause(); // Pausar ou reanudar o slider
        }
    });

    indicators.forEach((indicator, i) => {
        indicator.addEventListener("click", () => {
            currentIndex = i;
            updateCarousel(currentIndex);
        });
    });

    // Iniciar carrusel
    updateCarousel(currentIndex);
    startAutoPlay();
});

