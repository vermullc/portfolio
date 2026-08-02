// Extends the navbar's blur surface to cover the mobile menu
// when it's open, so the top bar and dropdown share one
// continuous blurred region instead of two separate ones.
const navCollapseEl = document.getElementById("nav");
const siteNavEl = document.querySelector(".site-nav");

if (navCollapseEl && siteNavEl) {
    navCollapseEl.addEventListener("show.bs.collapse", () => {
        // Wait one frame so Bootstrap has finished un-hiding the
        // menu before we measure its height — otherwise scrollHeight
        // reads as 0 since the menu is still display:none at the
        // moment this event fires.
        requestAnimationFrame(() => {
            const extra = navCollapseEl.scrollHeight;
            siteNavEl.style.setProperty("--collapse-extra", `${extra}px`);
        });
    });

    navCollapseEl.addEventListener("hide.bs.collapse", () => {
        siteNavEl.style.setProperty("--collapse-extra", "0px");
    });
}