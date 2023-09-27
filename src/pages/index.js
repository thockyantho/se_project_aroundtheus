import "../pages/index.css";

// Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, selectors } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import { settings } from "../utils/constants.js";

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

const userInfo = new UserInfo(profileTitle, profileDescription);

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

const addCardForm = new PopupWithForm(
  "#add-card-modal",
  handleCardAddFormSubmit
);
addCardForm.setEventListeners();

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleCardAddFormSubmit({ title, url }) {
  const cardData = {
    name: title,
    link: url,
  };
  renderCard(cardData);
}

const profileForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileForm.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardForm.open();
  addFormValidator.toggleButtonState();
});

const popupWithImage = new PopupWithImage("#preview-image");
popupWithImage.setEventListeners();

function handlePreviewImage(name, link) {
  popupWithImage.open(name, link);
}

// ---------------------------------------------------------------------------------------

// Create instances of the classes

// const editFormValidator = new FormValidator(config, addCardFormElement);
// const cardFormValidator = new FormValidator(config, profileEditForm);

// function InputProfileForm() {
//   const userData = userInfo.getUserInfo();
//   profileNameInput.value = userData.name;
//   profileDescriptionInput.value = userData.description;
// }

/*---------------------------------------------------------------------------*/
/*                               Event Handlers                              */
/*---------------------------------------------------------------------------*/
// const userInfo = new UserInfo(".profile__title", ".profile__description");

// function handleProfileEditSubmit(formData) {
//   userInfo.setUserInfo(formData.name, formData.description);
//   formProfileEditModal.close();
// }

/*---------------------------------------------------------------------------*/
/*                               Event Listeners                             */
/*---------------------------------------------------------------------------*/

// const handleEditClick = () => {
//   InputProfileForm();
//   formProfileEditModal.open();
// };

// profileEditButton.addEventListener("click", handleEditClick);

// function handleAddCardFormSubmit({ title, description }) {
//   const cardData = {
//     name: title,
//     link: description,
//   };

//   const card = renderCard(cardData);
//   cardSection.addItem(card);
//   addCardPopup.close();
// }

// addNewCardButton.addEventListener("click", () => {
//   addCardPopup.open();
//   cardFormValidator.toggleButtonState();
// });

// function renderCard(cardData) {
//   const card = new Card(cardData, selectors.cardTemplate, (imgData) => {
//     cardPreviewPopup.open(imgData);
//   });

//   return card.getView();
// }

// const cardPreviewPopup = new PopupWithImage(selectors);

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (data) => {
//       const card = new Card(
//         {
//           data,
//           handleImageClick: (imgData) => {
//             cardPreviewPopup.open(imgData);
//           },
//         },
//         selectors.cardTemplate
//       );
//       cardSection.addItem(card.getView());
//     },
//   },
//   selectors.cardSection
// );

// // Initiallize all my instances
// cardSection.renderItems();
// cardPreviewPopup.setEventListeners();
// editFormValidator.enableValidation();
// cardFormValidator.enableValidation();

// const addCardPopup = new PopupWithForm(
//   "#add-card-modal",
//   handleAddCardFormSubmit
// );
// addCardPopup.setEventListeners();

// // All the rest
// const formProfileEditModal = new PopupWithForm(
//   selectors.profileEditModal,
//   handleProfileEditSubmit
// );
// formProfileEditModal.setEventListeners();

// export { cardPreviewPopup };
// export { formProfileEditModal };
