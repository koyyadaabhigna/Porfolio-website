const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\koyya\\Desktop\\abhi\\p1';

// 1. Update index.html
const indexHtmlPath = path.join(dir, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const regex = /<ul class="nav-links">[\s\S]*?<div class="hamburger" id="hamburger">\s*<span><\/span><span><\/span><span><\/span>\s*<\/div>/m;
const navReplacement = `<ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#stack">Stack</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="nav-controls" style="display: flex; gap: 1.5rem; align-items: center;">
      <button id="theme-toggle" aria-label="Toggle Theme" style="background: none; border: none; color: var(--neon); font-size: 1.2rem; cursor: pointer; transition: color 0.3s, transform 0.3s;">
        <i class="fas fa-sun"></i>
      </button>
      <div class="hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </div>`;

if (!indexHtml.includes('id="theme-toggle"')) {
    indexHtml = indexHtml.replace(regex, navReplacement);
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log('Updated index.html');
}

// 2. Update style.css
const styleCssPath = path.join(dir, 'style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');
const cssAddition = `

/* ═══════════════════════════════════════════
   LIGHT MODE OVERRIDES
═══════════════════════════════════════════ */
body {
  transition: background-color 0.3s, color 0.3s;
}
.light-mode {
  --bg: #f8fafc;
  --bg2: #ffffff;
  --surface: #ffffff;
  --surface2: #f1f5f9;
  --text: #0f172a;
  --muted: #475569;
  --border: rgba(0, 0, 0, 0.1);
}
.light-mode .noise {
  opacity: 0.05;
  filter: invert(1);
}
.light-mode .project-glow, 
.light-mode .profile-glow, 
.light-mode .hero-glow {
  opacity: 0.3;
}
.light-mode .btn-primary {
  color: var(--bg);
}
.light-mode .stack-card, 
.light-mode .project-card, 
.light-mode .contact-form-wrap {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}
.light-mode .hero-name {
  color: var(--text);
}
.light-mode .nav-logo {
  color: var(--neon);
}
`;
if (!styleCss.includes('LIGHT MODE OVERRIDES')) {
  fs.writeFileSync(styleCssPath, styleCss + cssAddition, 'utf8');
  console.log('Updated style.css');
}

// 3. Update script.js
const scriptJsPath = path.join(dir, 'script.js');
let scriptJs = fs.readFileSync(scriptJsPath, 'utf8');
const jsAddition = `

/* ── Theme Toggle ── */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const icon = themeToggle.querySelector('i');

  // Check saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
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
`;
if (!scriptJs.includes('Theme Toggle')) {
  fs.writeFileSync(scriptJsPath, scriptJs + jsAddition, 'utf8');
  console.log('Updated script.js');
}
