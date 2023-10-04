import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popupElement.querySelector(
      "#preview-image-of-modal"
    );
    this._cardTitle = this._popupElement.querySelector(".modal__title-preview");
  }
  // constructor({ previewImageModal, previewImage, previewImageTitle }) {
  //   super(previewImageModal);
  //   this._image = this._popupElement.querySelector(previewImage);
  //   this._title = this._popupElement.querySelector(previewImageTitle);
  // }

  open(name, link) {
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardTitle.textContent = name;
    super.open();
  }
}
