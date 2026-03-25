/* ── Cursor ── */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .price-card, .amenity-item, .gallery-item, .highlight-item, .location-adv').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile Menu ── */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.add('open');
});
document.getElementById('mobileClose').addEventListener('click', closeMobileMenu);
function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

/* ── Scroll Reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

/* ── Modal ── */
function openModal(e) {
  if (e) e.preventDefault();
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Form ── */
function handleFormSubmit(e) {
  e.preventDefault();
  closeModal();
  showToast('Thank you! Our team will contact you shortly.');
  e.target.reset();
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
    background:var(--gold); color:var(--charcoal);
    padding:16px 32px; font-size:13px; letter-spacing:1px;
    z-index:9999; font-family:'DM Sans',sans-serif;
    box-shadow: 0 10px 40px rgba(201,169,110,0.4);
    animation: fadeUp 0.4s ease forwards;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

/* ── Stagger reveal delays ── */
document.querySelectorAll('.about-feature').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1) + 's';
});
document.querySelectorAll('.highlight-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.08) + 's';
});
document.querySelectorAll('.amenity-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1) + 's';
});