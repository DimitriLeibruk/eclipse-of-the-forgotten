document.addEventListener("DOMContentLoaded", () => {

    /* ================= PARALLAX HERO ================= */
    const hero = document.querySelector(".hero");
    if (hero) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";
        });
    }

    /* ================= PARTÍCULAS COM CANVAS ================= */
    const canvas = document.getElementById("particles-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particlesArray = [];
        const numberOfParticles = 80;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedY = Math.random() * 0.5 + 0.2;
                this.opacity = Math.random() * 1.5 + 0.3;
            }

            update() {
                this.y -= this.speedY;
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.fillStyle = `rgba(125, 219, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray.length = 0;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    /* ================= BOTÕES (INDEX / COMPRAR) ================= */
    const journeyBtn = document.getElementById("journey-btn");
    if (journeyBtn) {
        journeyBtn.addEventListener("click", () => {
            window.location.href = "comprar.html";
        });
    }

    const backHomeBtn = document.getElementById("back-home-btn");
    if (backHomeBtn) {
        backHomeBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    /* ================= LIVRO SINOPSE ================= */
    const bookWrapper = document.querySelector(".book-wrapper");
    const pages = document.querySelectorAll(".book-page");
    const nextBtn = document.getElementById("next-page");
    const prevBtn = document.getElementById("prev-page");

    if (bookWrapper && pages.length && nextBtn && prevBtn) {
        let currentPage = 0;

        function updateBook() {
            bookWrapper.style.transform = `translateX(-${currentPage * 100}%)`;
        }

        nextBtn.addEventListener("click", () => {
            if (currentPage < pages.length - 1) {
                currentPage++;
                updateBook();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentPage > 0) {
                currentPage--;
                updateBook();
            }
        });
    }

    /* ================= ROTADOR ABOUT ================= */
    const aboutSlides = document.querySelectorAll(".about-slide");
    if (aboutSlides.length) {
        let currentSlide = 0;

        function changeAboutSlide() {
            aboutSlides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % aboutSlides.length;
            aboutSlides[currentSlide].classList.add("active");
        }

        setInterval(changeAboutSlide, 4000);
    }

    /* ================= REVELAÇÃO DINÂMICA AO SCROLL ================= */
    const hiddenElements = document.querySelectorAll(".hidden");
    if (hiddenElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    // ✅ uma vez que apareceu, não precisa sumir de novo
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        hiddenElements.forEach(el => observer.observe(el));
    }

    /* ================= CODEX MODAL SCRIPT ================= */
    const codexItems = document.querySelectorAll(".codex-item");
    const codexModal = document.getElementById("codexModal");
    const codexImage = document.getElementById("codexImage");
    const codexTitle = document.getElementById("codexTitle");
    const codexDescription = document.getElementById("codexDescription");
    const closeCodex = document.querySelector(".close-codex");

    if (codexItems.length && codexModal && codexImage && codexTitle && codexDescription && closeCodex) {
        codexItems.forEach(item => {
            item.addEventListener("click", () => {
                codexImage.src = item.src;
                codexTitle.textContent = item.dataset.title || "";
                codexDescription.innerText = item.dataset.description || "";
                codexModal.classList.add("active");
            });
        });

        closeCodex.addEventListener("click", () => {
            codexModal.classList.remove("active");
        });

        codexModal.addEventListener("click", (e) => {
            if (e.target === codexModal) {
                codexModal.classList.remove("active");
            }
        });
    }

    /* ================= LIGHTBOX SCRIPT (se você for usar) ================= */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");
    const galleryImages = document.querySelectorAll(".gallery-container img");

    if (lightbox && lightboxImg && closeLightbox && galleryImages.length) {
        galleryImages.forEach(image => {
            image.addEventListener("click", () => {
                lightbox.classList.add("active");
                lightboxImg.src = image.src;
            });
        });

        closeLightbox.addEventListener("click", () => {
            lightbox.classList.remove("active");
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
            }
        });
    }

    /* ================= CONTROLE DE MÚSICA ================= */
    const music = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    const volumeSlider = document.getElementById("volume-slider");

    if (music && musicToggle && volumeSlider) {
        music.volume = 0.3;

        // autoplay pode falhar (normal em browsers), mas o toggle funciona
        window.addEventListener("load", () => {
            music.play().catch(() => {});
        });

        volumeSlider.addEventListener("input", () => {
            music.volume = Number(volumeSlider.value);
        });

        musicToggle.addEventListener("click", () => {
            // Aqui é melhor play/pause do que muted (fica mais intuitivo)
            if (music.paused) {
                music.play().catch(() => {});
                musicToggle.textContent = "🔊";
            } else {
                music.pause();
                musicToggle.textContent = "🔇";
            }
        });
    }

});
