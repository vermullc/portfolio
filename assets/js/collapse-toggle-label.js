// Swaps a "Show" / "Hide" label on any collapse toggle button
// that includes a .toggle-label element, to reflect its current
// expanded state. Works for any number of toggles on a page —
// each toggle's data-bs-target is used to find its matching
// collapsible element.

document.querySelectorAll(".toggle-label").forEach((labelEl) => {
    const toggleButton = labelEl.closest("[data-bs-target]");
    if (!toggleButton) return;

    const targetSelector = toggleButton.getAttribute("data-bs-target");
    const collapseEl = document.querySelector(targetSelector);
    if (!collapseEl) return;

    collapseEl.addEventListener("show.bs.collapse", () => {
        labelEl.textContent = "Hide";
    });

    collapseEl.addEventListener("hide.bs.collapse", () => {
        labelEl.textContent = "Show";
    });
});