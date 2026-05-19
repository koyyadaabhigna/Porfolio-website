const fs = require('fs');

const index = 'c:\\Users\\koyya\\Desktop\\abhi\\p1\\index.html';
const style = 'c:\\Users\\koyya\\Desktop\\abhi\\p1\\style.css';
const script = 'c:\\Users\\koyya\\Desktop\\abhi\\p1\\script.js';

let h = fs.readFileSync(index, 'utf8');
const rx = /<ul class="nav-links">[\s\S]*?<div class="hamburger" id="hamburger">\s*<span><\/span><span><\/span><span><\/span>\s*<\/div>/m;
const rep = \`<ul class="nav-links"><li><a href="#about">About</a></li><li><a href="#stack">Stack</a></li><li><a href="#projects">Projects</a></li><li><a href="#skills">Skills</a></li><li><a href="#contact">Contact</a></li></ul><div style="display: flex; gap: 1.5rem; align-items: center;"><button id="theme-toggle" aria-label="Toggle Theme" style="background: none; border: none; color: var(--neon); font-size: 1.2rem; cursor: pointer; transition: color 0.3s, transform 0.3s;"><i class="fas fa-sun"></i></button><div class="hamburger" id="hamburger"><span></span><span></span><span></span></div></div>\`;
if(!h.includes('id="theme-toggle"')){
  fs.writeFileSync(index, h.replace(rx, rep));
}

let s = fs.readFileSync(style, 'utf8');
if(!s.includes('LIGHT MODE')) {
  fs.writeFileSync(style, s + \`
body { transition: background-color 0.3s, color 0.3s; }
.light-mode { --bg: #f8fafc; --bg2: #ffffff; --surface: #ffffff; --surface2: #f1f5f9; --text: #0f172a; --muted: #475569; --border: rgba(0, 0, 0, 0.1); }
.light-mode .noise { opacity: 0.05; filter: invert(1); }
.light-mode .project-glow, .light-mode .profile-glow, .light-mode .hero-glow { opacity: 0.3; }
.light-mode .btn-primary { color: var(--bg); }
.light-mode .stack-card, .light-mode .project-card, .light-mode .contact-form-wrap { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border-color: rgba(0, 0, 0, 0.05); }
.light-mode .hero-name { color: var(--text); }
.light-mode .nav-logo { color: var(--neon); }
\`);
}

let j = fs.readFileSync(script, 'utf8');
if(!j.includes('theme-toggle')) {
  fs.writeFileSync(script, j + \`
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const icon = themeToggle.querySelector('i');
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    icon.classList.replace('fa-sun', 'fa-moon');
  }
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light');
      icon.classList.replace('fa-sun', 'fa-moon');
    } else {
      localStorage.setItem('theme', 'dark');
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  });
}
\`);
}
