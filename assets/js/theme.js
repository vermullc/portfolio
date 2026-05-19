// Handles light/dark theme switching across the site.

// Get the theme toggle button and icon from the page.
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Get the user's saved theme, if one exists.
const storedTheme = localStorage.getItem("theme");

// Otherwise, use the user's system preference.
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Use saved theme first. If none exists, use system theme.
const currentTheme = storedTheme || systemTheme;

// Apply the starting theme.
document.documentElement.setAttribute("data-bs-theme", currentTheme);
updateIcon();

// Only add the click event if the toggle exists on the page.
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nowTheme = document.documentElement.getAttribute("data-bs-theme");
        const nextTheme = nowTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-bs-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
        updateIcon();
    });
}

// Update the icon based on the current theme.
function updateIcon() {
    if (!themeIcon) return;

    const theme = document.documentElement.getAttribute("data-bs-theme");
    themeIcon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon";
}