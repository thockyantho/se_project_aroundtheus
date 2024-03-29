const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image");

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

export const handleEscUp = (evt) => {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
};
