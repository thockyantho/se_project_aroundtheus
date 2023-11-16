import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._deletePopup = this._popupElement.querySelector(".modal__form");
    this._deleteConfirmSubmit = this._popupElement.querySelector(
      ".modal__button-delete_save"
    );
    this._deleteSubmitConfimText = this._deleteConfirmSubmit.textContent;
  }

  setSubmitAction(action) {
    this.handleConfirmAction = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deletePopup.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleConfirmAction(e);
    });
  }

  deleting = (deleting, deletingText = "Deleting...") => {
    if (deleting) {
      this._deleteConfirmSubmit.textContent = deletingText;
    } else {
      this._deleteConfirmSubmit.textContent = this._deleteSubmitConfimText;
    }
  };
}
