const bgMusic = document.getElementById("bgMusic");
let current = 1;

function nextPage() {
    const currentPage = document.getElementById("page" + current);
    const nextPage = document.getElementById("page" + (current + 1));

    if (!nextPage) {
        return;
    }

    if (currentPage) {
        currentPage.classList.remove("active");
    }

    current++;
    nextPage.classList.add("active");
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

        bgMusic.play().catch(err => console.log("Autoplay blocked: - script.js:41", err));

        clearInterval(timer);

        countdown.style.display = "none";

        birthdayText.classList.remove("hidden");
        message.classList.remove("hidden");
        giftBtn.classList.remove("hidden");
    }

}, 1000);

// Start music after first user interaction
document.addEventListener("click", function startMusic() {
    bgMusic.play().catch(err => {
        console.log("Music couldn't start: - script.js:57", err);
    });

    document.removeEventListener("click", startMusic);
});