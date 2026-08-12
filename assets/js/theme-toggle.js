// Handles the light/dark theme toggle button and its icon. The
// initial theme itself is already set by theme-init.js in <head>
// (before this file loads), so this file only needs to manage
// switching it afterward.

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

updateIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nowTheme = document.documentElement.getAttribute("data-bs-theme");
        const nextTheme = nowTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-bs-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
        updateIcon();
    });
}

function updateIcon() {
    if (!themeIcon) return;

    const theme = document.documentElement.getAttribute("data-bs-theme");
    themeIcon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon";
}