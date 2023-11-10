import "../pages/index.css";

// Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import { initialCards, settings } from "../utils/constants";
import Api from "../components/Api";
/*---------------------------------------------------------------------------*/
/*                               Element                                     */
/*---------------------------------------------------------------------------*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8591f7fe-0114-4a2f-84de-cfb13be7817c",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfoAndCards()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .addNewCard()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

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
  editFormValidator.resetValidation();
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
const addFormValidator = new FormValidator(settings, cardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleCardAddFormSubmit(cardData) {
  renderCard(cardData);
}

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardForm.open();
});

const popupWithImage = new PopupWithImage("#preview-image");

popupWithImage.setEventListeners();

function handlePreviewImage(name, link) {
  popupWithImage.open(name, link);
}
