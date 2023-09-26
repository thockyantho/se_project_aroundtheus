import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ previewImageModal, previewImage, previewImageTitle }) {
    super(previewImageModal);
    this._image = this._popupElement.querySelector(previewImage);
    this._title = this._popupElement.querySelector(previewImageTitle);
  }

  open(data) {
    this._imgPreview.src = data._link;
    this._altPreview.alt = data._name;
    this._titlePreview.textContent = data._name;
    super.open();
  }
}
