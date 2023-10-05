import "../pages/index.css";

// Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import initialCards from "../utils/constants";

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/*---------------------------------------------------------------------------*/
/*                               Element                                     */
/*---------------------------------------------------------------------------*/

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handlePreviewImage);
  return cardElement.getView();
}
function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}

function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo(formData.name, formData.description);
  profileForm.close();
}

const handleEditClick = () => {
  fillProfileForm();
  profileForm.open();
  editFormValidator.toggleButtonState();
};
profileEditButton.addEventListener("click", handleEditClick);

const renderCard = (cardData) => {
  const newCard = createCard(cardData);
  cardSection.addItem(newCard);
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__card-list"
);

cardSection.renderItems();

// form popup
const addCardForm = new PopupWithForm(
  "#add-card-modal",
  handleCardAddFormSubmit
);
addCardForm.setEventListeners();

//profie edit popup

const userInfo = new UserInfo(profileTitle, profileDescription);
const profileForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileForm.setEventListeners();

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleCardAddFormSubmit(cardData) {
  renderCard(cardData);
}

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardForm.open();
});

const popupWithImage = new PopupWithImage("#preview-image");
popupWithImage.setEventListeners();

function handlePreviewImage(name, link) {
  popupWithImage.open(name, link);
}
