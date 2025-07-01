// 🎂 Countdown
const bday = new Date("2025-07-18T00:00:00").getTime();
const countdown = document.getElementById("countdown");
setInterval(() => {
    const now = new Date().getTime();
    const gap = bday - now;
    if (gap <= 0) {
        countdown.innerHTML = "🎉 It's her Birthday!";
        return;
    }
    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((gap % (1000 * 60)) / 1000);
    countdown.innerHTML = `⏳ ${d}d ${h}h ${m}m ${s}s`;
}, 1000);

// 📸 Slideshow
let slides = document.querySelectorAll(".slide");
let i = 0;
function showSlides() {
    if (!slides.length) return; // avoid error if no slides
    slides.forEach(s => s.style.display = "none");
    i = (i + 1) % slides.length;
    slides[i].style.display = "block";
}
if (slides.length) {
    showSlides();
    setInterval(showSlides, 3000);
}

// ✨ Secret toggle
function toggleSecret() {
    document.getElementById("secret").classList.toggle("hidden");
}

// 🎊 Confetti
const confettiCanvas = document.getElementById('confetti');
if (confettiCanvas) {
    const confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    let confettis = Array.from({ length: 150 }, () => ({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 100 + 10,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        tilt: Math.random() * 10 - 5
    }));

    function drawConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettis.forEach(c => {
            confettiCtx.beginPath();
            confettiCtx.fillStyle = c.color;
            confettiCtx.ellipse(c.x, c.y, c.r, c.r / 2, c.tilt, 0, Math.PI * 2);
            confettiCtx.fill();
        });
        updateConfetti();
        requestAnimationFrame(drawConfetti);
    }

    function updateConfetti() {
        confettis.forEach(c => {
            c.y += Math.cos(c.d) + 1 + c.r / 2;
            c.x += Math.sin(c.d);
            if (c.y > confettiCanvas.height) {
                c.x = Math.random() * confettiCanvas.width;
                c.y = -10;
            }
        });
    }

    drawConfetti();
}

// 💖 Surprise hearts
function revealSurprise() {
    document.getElementById('surprise').style.display = 'block';

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '60%';
        heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
        heart.innerHTML = '💗';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
}

// 🎵 Music
const audio = document.getElementById('bg-music');
const musicToggleBtn = document.querySelector('.music-toggle');

function hidePopup() {
    document.getElementById('entry-popup').style.display = 'none';

    // User interacted with the page: start music with sound!
    audio.muted = false;
    audio.volume = 0.5; // optional: adjust volume
    audio.play().catch(e => console.log('Audio play error:', e));
}

function toggleMusic() {
    if (audio.muted) {
        audio.muted = false;
        musicToggleBtn.textContent = '🔊';
    } else {
        audio.muted = true;
        musicToggleBtn.textContent = '🔇';
    }
}

// ✨ Floating particles (pink hearts background)
const particleCanvas = document.getElementById("particle-canvas");
const particleCtx = particleCanvas.getContext("2d");

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
    }
    draw() {
        particleCtx.fillStyle = "rgba(255,182,193,0.5)";
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fill();
    }
}
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}
function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particlesArray.forEach((p) => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
window.addEventListener("resize", () => {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    initParticles();
});
initParticles();
animateParticles();
