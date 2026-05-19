// Enables click-to-enlarge behavior for project screenshots.

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalBody = document.querySelector(".image-modal-body");
const projectImages = document.querySelectorAll(".project-media-img");

if (imageModal && modalImage && modalBody && projectImages.length > 0) {
    projectImages.forEach(image => {
        image.addEventListener("click", () => {
            modalImage.src = image.src;
            modalImage.alt = image.alt;

            modalImage.classList.remove("is-zoomed");
            modalBody.classList.remove("is-zoomed");

            const modal = new bootstrap.Modal(imageModal);
            modal.show();
        });
    });

    modalImage.addEventListener("click", event => {
        event.stopPropagation();

        modalImage.classList.toggle("is-zoomed");
        modalBody.classList.toggle("is-zoomed");
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