import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._deletePopup = this._popupElement.querySelector(".modal__form");
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
}
