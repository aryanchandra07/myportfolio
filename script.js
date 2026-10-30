const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 25));
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const roles = ['Software Developer', 'Python & Java Programmer', 'AI-driven Systems Enthusiast'];
let roleIndex = 0, charIndex = 0, deleting = false;
const roleEl = document.getElementById('typed-role');
function typeRole() {
  const current = roles[roleIndex];
  roleEl.textContent = current.slice(0, charIndex);
  if (!deleting && charIndex < current.length) { charIndex++; setTimeout(typeRole, 75); }
  else if (!deleting) { deleting = true; setTimeout(typeRole, 1350); }
  else if (charIndex > 0) { charIndex--; setTimeout(typeRole, 35); }
  else { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 250); }
}
typeRole();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`);
  const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`);
  window.location.href = `mailto:aryanchandra0808@gmail.com?subject=${subject}&body=${body}`;
});

// Subtle animated network background
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');
let points = [];
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(65, Math.floor(canvas.clientWidth / 18));
  points = Array.from({length: count}, () => ({
    x: Math.random() * canvas.clientWidth, y: Math.random() * canvas.clientHeight,
    vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22
  }));
}
function drawNetwork() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  points.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(200,166,106,.5)'; ctx.fill();
    for (let j = i + 1; j < points.length; j++) {
      const q = points[j], dx = p.x - q.x, dy = p.y - q.y, dist = Math.hypot(dx, dy);
      if (dist < 125) {
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(200,166,106,${(1 - dist / 125) * .13})`; ctx.lineWidth = .7; ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawNetwork);
}
resizeCanvas(); drawNetwork();
window.addEventListener('resize', resizeCanvas);
