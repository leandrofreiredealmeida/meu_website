// Atualiza o ano atual no footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// ===== LIGHT/DARK MODE =====
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

if (savedTheme) {
  body.className = savedTheme;
} else if (systemPrefersDark) {
  body.className = "dark-theme";
} else {
  body.className = "light-theme";
}

function updateThemeIcon() {
  if (body.classList.contains("dark-theme")) {
    themeIcon.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "Alternar para tema claro");
  } else {
    themeIcon.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Alternar para tema escuro");
  }
}

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-theme")) {
    body.classList.replace("dark-theme", "light-theme");
    localStorage.setItem("theme", "light-theme");
  } else {
    body.classList.replace("light-theme", "dark-theme");
    localStorage.setItem("theme", "dark-theme");
  }
  updateThemeIcon();
});

updateThemeIcon();

// ===== HIGHLIGHT DO LINK ATIVO NO NAV =====
(function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("active");
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
    if (
      (currentPage === "" || currentPage === "index.html") &&
      linkPage === "index.html"
    ) {
      link.classList.add("active");
    }
  });
})();

// ===== SCROLL SUAVE PARA ÂNCORAS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      }
    }
  });
});

// ===== FADE-IN AO ENTRAR NO VIEWPORT =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("section-hidden");
        entry.target.classList.add("section-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".section-hidden")
  .forEach((el) => observer.observe(el));

// ===== FORMULÁRIO DE CONTATO (mailto) =====
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      document.getElementById("contact-subject").value.trim(),
    );
    const body = encodeURIComponent(
      document.getElementById("contact-message").value.trim(),
    );
    window.location.href = `mailto:lefreirealmeida@gmail.com?subject=${subject}&body=${body}`;
  });
}
