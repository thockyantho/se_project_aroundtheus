export default class Card {
  constructor({ name, link }, cardSelector, handlePreviewImage) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewImage(this._name, this._link);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
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
    this._cardElement = this._getTemplate();

    // select like button
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    // select delete
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._trashButton.addEventListener("click", () => {
      this._handleTrashButton();
    });

    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
