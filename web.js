/*  Helpers  */
const root = document.documentElement;
const body = document.body;

function save(key, value) {
  localStorage.setItem(key, value);
}
function load(key) {
  return localStorage.getItem(key);
}
function remove(key) {
  localStorage.removeItem(key);
}

/*  Theme  */
function setTheme(theme) {
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  save("theme", theme);
}

function initTheme() {
  const saved = load("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(saved || (systemDark ? "dark" : "light"));

  document.getElementById("theme-toggle-button")?.addEventListener("click", () => {
    const current = root.classList.contains("dark") ? "light" : "dark";
    setTheme(current);
  });
}

/*  Fonts  */
function setFont(font) {
  body.classList.remove("font-tajawal", "font-cairo", "font-alexandria");
  body.classList.add(`font-${font}`);
  save("font", font);
}

function initFonts() {
  setFont(load("font") || "tajawal");

  document.querySelectorAll(".font-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      setFont(btn.dataset.font);
    });
  });
}

/*  Colors  */
const colors = {
  indigo: ["#6366f1", "#8b5cf6", "#ec4899"],
  ocean: ["#2563eb", "#0ea5e9", "#38bdf8"],
  forest: ["#10b981", "#22c55e", "#14b8a6"],
  sunset: ["#f97316", "#f59e0b", "#f43f5e"],
  candy: ["#ec4899", "#a855f7", "#f472b6"],
};

function setPalette(name) {
  const palette = colors[name];
  if (!palette) return;

  root.style.setProperty("--color-primary", palette[0]);
  root.style.setProperty("--color-secondary", palette[1]);
  root.style.setProperty("--color-accent", palette[2]);

  save("palette", name);
  drawPalette(name);
}

function drawPalette(active) {
  const box = document.getElementById("theme-colors-grid");
  if (!box) return;
  box.innerHTML = "";

  Object.keys(colors).forEach((key) => {
    const btn = document.createElement("button");
    btn.style.width = "45px";
    btn.style.height = "45px";
    btn.style.borderRadius = "50%";
    btn.style.background = `linear-gradient(135deg, ${colors[key].join(",")})`;
    btn.style.border = key === active ? "3px solid var(--color-primary)" : "2px solid #ccc";

    btn.addEventListener("click", () => setPalette(key));
    box.appendChild(btn);
  });
}

/*  Settings Sidebar  */
function initSettings() {
  const sidebar = document.getElementById("settings-sidebar");

  document.getElementById("settings-toggle")?.addEventListener("click", () => {
    sidebar.classList.toggle("translate-x-full");
  });

  document.getElementById("close-settings")?.addEventListener("click", () => {
    sidebar.classList.add("translate-x-full");
  });

  document.getElementById("reset-settings")?.addEventListener("click", () => {
    remove("theme");
    remove("font");
    remove("palette");
    setTheme("dark");
    setFont("tajawal");
    setPalette("indigo");
  });
}

/*  Scroll To Top  */
function initScrollTop() {
  const btn = document.getElementById("scroll-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("hidden", window.scrollY < 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/*  Portfolio Filter  */
function initFilter() {
  const buttons = document.querySelectorAll(".portfolio-filter");
  const cards = document.querySelectorAll(".portfolio-item");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.filter;

      cards.forEach((card) => {
        const cat = card.dataset.category || "";
        card.classList.toggle("hidden", type !== "all" && !cat.includes(type));
      });
    });
  });
}

/*  Contact Form  */
function initForm() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("تم إرسال الرسالة بنجاح ✅");
    form.reset();
  });
}

/*  Start  */
document.addEventListener("DOMContentLoaded", () => {
  setPalette(load("palette") || "indigo");
  initTheme();
  initFonts();
  initSettings();
  initScrollTop();
  initFilter();
  initForm();
});
