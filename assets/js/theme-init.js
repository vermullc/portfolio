// Sets the theme before any CSS renders, to prevent a flash of
// the wrong theme on load. Must be loaded in <head>, before the
// Bootstrap CSS <link> tag, and must run synchronously (no defer
// or async) so it finishes before the browser starts painting.
(function () {
    const storedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", storedTheme || systemTheme);
})();