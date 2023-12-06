import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputItems = this._popupForm.querySelectorAll(".modal__input");

    this._submitButton = this._popupElement.querySelector(
      ".modal__button-text"
    );
    this._saveSubmitText = this._submitButton.textContent;
  }
  _getInputValues() {
    const inputValues = {};
    this._inputItems.forEach((inputItems) => {
      inputValues[inputItems.name] = inputItems.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputItems.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  saving = (saving, savingText = "Saving...") => {
    if (saving) {
      this._submitButton.textContent = savingText;
    } else {
      this._submitButton.textContent = this._saveSubmitText;
    }
  };
}
