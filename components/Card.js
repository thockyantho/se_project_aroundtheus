import { openModal } from "../utils/utils.js";

const previewImageModal = document.querySelector("#preview-image");
const imgPreview = previewImageModal.querySelector(
  ".modal__card-image-preview"
);
const titlePreview = previewImageModal.querySelector(".modal__title-preview");
const altPreview = previewImageModal.querySelector("#preview-image-of-modal");

class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleTrashButton();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture();
      });
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._element.remove();
    this._element = null;
  }
  _handlePreviewPicture() {
    imgPreview.src = this._link;
    altPreview.alt = this._name;
    titlePreview.textContent = this._name;
    openModal(previewImageModal);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__title").alt = this._name;
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
