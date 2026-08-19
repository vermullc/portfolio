// Enables click-to-enlarge behavior for project screenshots.

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalBody = document.querySelector(".image-modal-body");
const projectImages = document.querySelectorAll(".project-media-img");
const modalHint = document.getElementById("modalHint");
const modalHintText = document.getElementById("modalHintText");

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (imageModal && modalImage && modalBody && projectImages.length > 0) {
    if (modalHintText) {
        modalHintText.textContent = isTouchDevice ? "Tap to zoom" : "Click to zoom";
    }

    projectImages.forEach(image => {
        image.addEventListener("click", () => {
            modalImage.src = image.src;
            modalImage.alt = image.alt;

            modalImage.classList.remove("is-zoomed");
            modalImage.style.width = "";
            modalBody.classList.remove("is-zoomed");
            modalBody.style.justifyContent = "";
            modalBody.style.alignItems = "";

            if (modalHint) {
                modalHint.classList.remove("is-hidden");
            }

            const modal = new bootstrap.Modal(imageModal);
            modal.show();
        });
    });

    modalImage.addEventListener("click", event => {
        event.stopPropagation();

        const isZoomingIn = !modalImage.classList.contains("is-zoomed");

        if (modalHint) {
            modalHint.classList.add("is-hidden");
        }

        if (isZoomingIn) {
            const rect = modalImage.getBoundingClientRect();
            const clickXFraction = (event.clientX - rect.left) / rect.width;
            const clickYFraction = (event.clientY - rect.top) / rect.height;

            // Zoom by a consistent multiplier of the image's own fitted
            // size, rather than a fixed vw/vh guess — this keeps the zoom
            // amount (and therefore the click-centering math) consistent
            // regardless of the image's aspect ratio.
            const zoomFactor = 1.8;
            modalImage.style.width = (rect.width * zoomFactor) + "px";

            modalImage.classList.add("is-zoomed");
            modalBody.classList.add("is-zoomed");

            const resizeObserver = new ResizeObserver(() => {
                resizeObserver.disconnect();

                const imgRect = modalImage.getBoundingClientRect();
                const bodyRect = modalBody.getBoundingClientRect();

                const overflowsX = imgRect.width > bodyRect.width;
                const overflowsY = imgRect.height > bodyRect.height;

                // Only pin an axis to the top-left (and scroll it) when the
                // zoomed image actually exceeds the viewport in that
                // direction. On an axis where it still fits, keep it
                // centered instead of shoving it to one edge with empty
                // space on the other side.
                modalBody.style.justifyContent = overflowsX ? "flex-start" : "center";
                modalBody.style.alignItems = overflowsY ? "flex-start" : "center";

                if (overflowsX) {
                    const targetX = modalBody.scrollLeft + (imgRect.left - bodyRect.left) + clickXFraction * imgRect.width;
                    modalBody.scrollLeft = targetX - bodyRect.width / 2;
                }

                if (overflowsY) {
                    const targetY = modalBody.scrollTop + (imgRect.top - bodyRect.top) + clickYFraction * imgRect.height;
                    modalBody.scrollTop = targetY - bodyRect.height / 2;
                }
            });

            resizeObserver.observe(modalImage);
        } else {
            modalImage.classList.remove("is-zoomed");
            modalImage.style.width = "";
            modalBody.classList.remove("is-zoomed");
            modalBody.style.justifyContent = "";
            modalBody.style.alignItems = "";
            modalBody.scrollLeft = 0;
            modalBody.scrollTop = 0;
        }
    });

    modalBody.addEventListener("click", () => {
        const modal = bootstrap.Modal.getInstance(imageModal);

        if (modal) {
            modal.hide();
        }
    });

    imageModal.addEventListener("hidden.bs.modal", () => {
        modalImage.src = "";
        modalImage.alt = "";
        modalImage.classList.remove("is-zoomed");
        modalBody.classList.remove("is-zoomed");
    });
}