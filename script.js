/* ──────────────────────────────────────────
   KOYYADA ABHIGNA — PORTFOLIO SCRIPT.JS
   ────────────────────────────────────────── */

'use strict';

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top  = e.clientY + 'px';
    }, 80);
  });

  document.querySelectorAll('a, button, .stack-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.2)';
      follower.style.width   = '56px';
      follower.style.height  = '56px';
      follower.style.borderColor = 'rgba(0,255,224,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.width   = '36px';
      follower.style.height  = '36px';
      follower.style.borderColor = 'rgba(0,255,224,0.4)';
    });
  });
} else {
  // Hide cursors on touch devices
  cursor.style.display   = 'none';
  follower.style.display = 'none';
}

/* ── Hamburger / Mobile Nav ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 60
    ? 'rgba(6,8,16,0.92)'
    : 'rgba(6,8,16,0.6)';
});

/* ── Intersection Observer — Reveal animations ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Skill bars ── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const bar = entry.target;
    bar.style.width = bar.dataset.width + '%';
    skillObserver.unobserve(bar);
  });
}, { threshold: 0.3 });

skillFills.forEach(bar => skillObserver.observe(bar));

/* ── Counter animation ── */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start);
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    animateCounter(el, parseInt(el.dataset.target));
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

/* ── Active nav link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) {
      current = sec.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--neon)'
      : '';
  });
});

/* ──────────────────────────────────────────
   CONTACT FORM — Backend Integration
   POST to http://localhost:5000/contact
   ────────────────────────────────────────── */
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const btnText    = document.getElementById('btnText');
const btnIcon    = document.getElementById('btnIcon');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Client-side validation
  if (!name || !email || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Set loading state
  submitBtn.disabled = true;
  btnText.textContent = 'Sending…';
  btnIcon.className   = 'fas fa-spinner fa-spin';
  clearStatus();

  try {
    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (response.ok) {
      showStatus('✅ Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
    } else {
      showStatus(data.error || '⚠️ Something went wrong. Please try again.', 'error');
    }
  } catch (err) {
    console.error('Contact form error:', err);
    showStatus('⚠️ Could not reach the server. Make sure the backend is running on port 5000.', 'error');
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
    btnIcon.className   = 'fas fa-paper-plane';
  }
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className   = `form-status ${type}`;
}
function clearStatus() {
  formStatus.textContent = '';
  formStatus.className   = 'form-status';
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
