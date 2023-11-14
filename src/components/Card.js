export default class Card {
  constructor({ name, link }, cardSelector, handlePreviewImage) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;

    // frequently accessed elements
    this._cardElement = this._getTemplate();
    // this._cardElement
    //   .querySelector(".card__trash")
    //   .addEventListener("click", () => {
    //     this._handleTrashButton(this);
    //   });
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");

    this._setEventListeners();
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handlePreviewImage(this._name, this._link);
    });
    // select like button
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    // select delete
    this._trashButton.addEventListener("click", () => {
      this._handleTrashButton();
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
