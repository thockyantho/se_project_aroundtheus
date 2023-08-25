class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = errorMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEls) {
    errorMessageEl.textContent = inputEls.validationMessage;
  }

  _toggleButtonState(inputEls) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableButton(
        this._submitButtonSelector,
        this._inactiveButtonClass
      );
      return;
    }

    this._enableButton(this._submitButtonSelector, this._inactiveButtonClass);
  }

  _hasInvalidInput() {
    return this._inputEls.every((input) => input.validity.valid);
  }

  _checkInputValidity() {
    if (!this._inputEls.validity.valid) {
      this._showInputError(inputEls);
    } else {
      this._hideInputError(inputEls);
    }
  }

  _setEventListeners(options) {
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(this._form, inputEl, options);
        this._toggleButtonState(inputEl, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
