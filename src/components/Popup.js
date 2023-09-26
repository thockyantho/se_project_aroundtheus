export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    //opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    //closes popup
    this._popupElement.classList.remove("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    // listens for esc button
    if (evt.key === "Escape") {
      this.close;
    }
  };

  setEventListeners() {
    // sets event listeners
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal__close") ||
        evt.target.classList.contains("modal")
      ) {
        this.close();
      }
    });
  }
}
