class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formEl;
  }

  _showInputError(inputEl, errorMessage) {
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
    if (!inputEls.validity.valid) {
      this._showInputError(inputEls);
    } else {
      this._hideInputError(inputEls);
    }
  }

  _setEventListeners(formEl, options) {
    this._inputEls = Array.from(
      this.form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this.form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this.form, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(form, options);
  }
}

export default FormValidator;