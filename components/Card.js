const previewImageModal = document.querySelector("#preview-image");
const ImageModal = document.querySelector("#card__image");
// const cardTitleInput = addCardFormElement.querySelector(
//   ".modal__input_type_title"
// );
// const cardImageEl = cardElement.querySelector(".card__image");

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

    this._element.querySelector(".card__image");

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture();
      });
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handleTrashButton() {
    this._element.remove();
    this._element = null;
  }
  _handlePreviewPicture() {
    this._element
      .querySelector(".elements__card-image-preview")
      .openModal(previewImageModal);
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

    this._setEventListeners();

    return this._element;
  }
}

export default Card;

// _setEventListeners() {
//   this._likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });
//   trashButton.addEventListener("click", () => {
//     cardElement.remove();
//   });
//   cardImageEl.addEventListener("click", () => {
//     openModal(previewImageModal);
//     imgPreview.src = cardData.link;
//     titlePreview.textContent = cardData.name;
//     altPreview.alt = cardData.name;
//   });
// }
