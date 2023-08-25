class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });
    trashButton.addEventListener("click", () => {
      cardElement.remove();
    });
    cardImageEl.addEventListener("click", () => {
      openModal(previewImageModal);
      imgPreview.src = cardData.link;
      titlePreview.textContent = cardData.name;
      altPreview.alt = cardData.name;
    });
  }

  // _setEventListeners() {
  //   this._element
  //     .querySelector(".card__like-button")
  //     .addEventListener("click", this._handleLikeIcon);

  //   this._element
  //     .querySelector(".card__trash-button")
  //     .addEventListener("click", this._handleTrashButton);

  //   this._element
  //     .querySelector(".card__image")
  //     .addEventListener("click", this._handlePreviewPicture);
  // }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handleTrashButton() {
    this._cardElement
      .querySelector(".elements__trash-button")
      .cardElement.remove();
  }
  _handlePreviewPicture() {
    this._cardElement
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

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
  }
}

export default Card;
