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
import PopupWithConfirmation from "../components/PopupWithConfirmation";
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

// const profileAddButton = document.querySelector("#profile-add-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

// const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = document.forms["modal-edit-profile-form"];
const cardForm = document.forms["card-form"];
const avatarImgButton = document.querySelector(".profile__avatar-button");

const userInfo = new UserInfo(
  document.querySelector(".profile__title"),
  document.querySelector(".profile__description"),
  document.querySelector(".profile__avatar")
);

const popupWithImage = new PopupWithImage("#preview-image");
const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleCardAddFormSubmit
);

newCardPopup.setEventListeners();

const formValidators = {};

function enableValidation(formEl, settings) {
  if (formEl.tagName.toLowerCase() !== "form") {
    console.error("Invalid form element provided:", formEl);
    return;
  }
  console.log(formEl);
  const validator = new FormValidator(settings, formEl);
  const formName = formEl.getAttribute("name");
  formValidators[formName] = validator;
  validator.enableValidation();
  return validator;
}

let editFormValidator = enableValidation(
  document.forms["modal-edit-profile-form"],
  settings
);
let addFormValidator = enableValidation(
  document.forms["modal-add-card-form"],
  settings
);
enableValidation(document.forms["avatar-modal-form"], settings);

function createCard(data) {
  const cardElement = new Card(
    data,
    "#card-template",
    handlePreviewImage,
    handleDeleteClick,

    handlelikes,
    handleProfileEditSubmit
  );
  return cardElement.getView();
}

// let newCardPopup;

function handleCardAddFormSubmit(data) {
  newCardPopup.saving(true);
  api
    .addNewCard(data)
    .then((card) => {
      const cardInput = createCard(card);
      section.addItem(cardInput);
    })
    .then(() => newCardPopup.close())
    .catch((err) => {
      console.error("Error:", err);
    })
    .finally(() => newCardPopup.saving(false));
}

let section;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    section = new Section(
      {
        items: cardData,
        renderer: (item) => {
          const cardElement = createCard(item);
          section.addItem(cardElement);
        },
      },
      ".cards__card-list"
    );
    section.renderItems();

    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

const popupAvatar = new PopupWithForm("#update-avatar-modal", (userData) => {
  popupAvatar.saving(true);
  const avatar = userData.avatar;
  return api
    .updateAvatar(avatar)
    .then((updateAvatar) => {
      userInfo.setAvatar(updateAvatar.avatar);
    })
    .then(() => popupAvatar.close())
    .catch((err) => {
      console.error("Error:", err);
    })
    .finally(() => popupAvatar.saving(false));
});
popupAvatar.setEventListeners();

avatarImgButton.addEventListener("click", () => {
  formValidators["modal-avatar-form"].toggleButtonState();
  popupAvatar.open();
});

function handlelikes(item) {
  const newLikeStatus = !item.isLiked;
  if (newLikeStatus) {
    api
      .likeCard(item.getId())
      .then((respond) => {
        item.setLikeStatus(respond.isLiked);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  } else {
    api
      .unlikeCard(item.getId())
      .then((respond) => {
        item.setLikeStatus(respond.isLiked);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }
}

function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}

function handleProfileEditSubmit(inputValues) {
  function makeRequest() {
    return api
      .updateProfileInfo(inputValues)
      .then((userData) => {
        userInfo.setUserInfo(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleCardAddFormSubmit(makeRequest);
}

const handleEditClick = () => {
  fillProfileForm();
  popupEditForm.open();
  editFormValidator.resetValidation();
};

profileEditButton.addEventListener("click", handleEditClick);

// profileEditButton.addEventListener("click", () => {
//   const userData = userInfo.getUserInfo();
//   popupEditForm.setInputValues(userData);
//   popupEditForm.open();
// });

// profileAddButton.addEventListener("click", () => {
//   formValidators["add-card-form"].toggleButtonState();
//   newCardPopup.open();
// });

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

const popupEditForm = new PopupWithForm(
  "#profile-edit-modal",
  ({ name, description }) => {
    popupEditForm.saving(true);
    return api
      .updateProfileInfo({ name, about: description })
      .then((updateProfileInfo) => {
        userInfo.setUserInfo(updateProfileInfo);
      })
      .then(() => popupEditForm.close())
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => popupEditForm.saving(false));
  }
);
popupEditForm.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  // addFormValidator.resetValidation();
  addCardForm.open();
});

function handlePreviewImage(name, link) {
  popupWithImage.open(name, link);
}

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: "#modal-delete-confirmation",
});
popupWithConfirmation.setEventListeners();

function handleDeleteClick(card) {
  popupWithConfirmation.open();
  popupWithConfirmation.setSubmitAction(() => {
    popupWithConfirmation.deleting(true);
    api
      .deleteCard(card.cardId)
      .then(() => {
        card.handleDeleteCard();
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => popupWithConfirmation.setSubmitAction(false));
  });
}
