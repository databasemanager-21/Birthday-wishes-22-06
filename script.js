const bgMusic = document.getElementById("bgMusic");
let current = 1;

function nextPage() {
    const currentPage = document.getElementById("page" + current);
    const nextPageEl = document.getElementById("page" + (current + 1));
    if (!nextPageEl) return;
    if (currentPage) {
        currentPage.classList.remove("active");
    }
    current++;
    nextPageEl.classList.add("active");
    if (current === 4) setTimeout(initCarousel, 300);
}

let count = 3;
const countdown = document.getElementById("countdown");
const birthdayText = document.getElementById("birthdayText");
const message = document.getElementById("message");
const giftBtn = document.getElementById("giftBtn");

const timer = setInterval(() => {
    count--;
    if (count > 0) {
        countdown.innerText = count;
    }
    if (count === 0) {
        countdown.innerText = "🎂";
    }
    if (count < 0) {
        bgMusic.play().catch(err => console.log("Autoplay blocked:", err));
        clearInterval(timer);
        countdown.style.display = "none";
        birthdayText.classList.remove("hidden");
        message.classList.remove("hidden");
        giftBtn.classList.remove("hidden");
    }
}, 1000);

document.addEventListener("click", function startMusic() {
    bgMusic.play().catch(err => {
        console.log("Music couldn't start:", err);
    });
    document.removeEventListener("click", startMusic);
});

// ── CAROUSEL ──
let currentSlide = 0;
let carouselTimer = null;

function initCarousel() {
    const imgs = document.querySelectorAll('.carousel-track img');
    const dotsContainer = document.getElementById('carouselDots');
    if (!imgs.length) {
        console.log("No images found!");
        return;
    }
    console.log("initCarousel fired, images found:", imgs.length);

    // Reset
    currentSlide = 0;
    if (carouselTimer) clearInterval(carouselTimer);

    // Remove active from all first
    imgs.forEach(img => {
        img.classList.remove('active');
        img.style.opacity = '0';
    });

    // Build dots
    dotsContainer.innerHTML = '';
    imgs.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });

    // Show first image directly
    imgs[0].classList.add('active');
    imgs[0].style.opacity = '1';

    carouselTimer = setInterval(() => moveSlide(1), 3000);
}

function goToSlide(index) {
    const imgs = document.querySelectorAll('.carousel-track img');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    currentSlide = (index + imgs.length) % imgs.length;
    imgs.forEach(img => {
        img.classList.remove('active');
        img.style.opacity = '0';
    });
    dots.forEach(dot => dot.classList.remove('active'));
    imgs[currentSlide].classList.add('active');
    imgs[currentSlide].style.opacity = '1';
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function moveSlide(dir) {
    goToSlide(currentSlide + dir);
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => moveSlide(1), 3000);
}
