/* ========== CANVAS STARFIELD ========== */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];

    // 별 생성 (1000개)
    for (let i = 0; i < 1000; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            opacity: Math.random(),
            speed: Math.random() * 0.05 + 0.02
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // 부드러운 이동 (대각선 방향)
        star.x -= star.speed;
        star.y += star.speed;

        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;

        // 반짝임 효과
        star.opacity += (Math.random() - 0.5) * 0.03;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 0.8) star.opacity = 0.8;
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();

/* ========== SMOOTH SCROLL ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ========== SCROLL REVEAL ANIMATION ========== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.scroll-reveal, .wobble-reveal').forEach(el => revealObserver.observe(el));
