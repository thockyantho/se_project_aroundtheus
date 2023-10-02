import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImageEl = this._popupElement.querySelector(".preview-image");
    this._cardTitleCaption = this._popupElement.querySelector(
      ".modal__title-preview"
    );
  }
  // constructor({ previewImageModal, previewImage, previewImageTitle }) {
  //   super(previewImageModal);
  //   this._image = this._popupElement.querySelector(previewImage);
  //   this._title = this._popupElement.querySelector(previewImageTitle);
  // }

  open(data) {
    this._cardImage.src = data._link;
    this._cardImage.alt = data._name;
    this._cardTitle.textContent = data._name;
    super.open();
  }
}
