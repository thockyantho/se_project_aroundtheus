import "../pages/index.css";

// Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { config, initialCards, selectors } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

/*---------------------------------------------------------------------------*/
/*                               Element                                     */
/*---------------------------------------------------------------------------*/

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

// Create instances of the classes

const editFormValidator = new FormValidator(config, addCardFormElement);
const cardFormValidator = new FormValidator(config, profileEditForm);

function InputProfileForm() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}

/*---------------------------------------------------------------------------*/
/*                               Event Handlers                              */
/*---------------------------------------------------------------------------*/
const userInfo = new UserInfo(".profile__title", ".profile__description");

function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo(formData.name, formData.description);
  formProfileEditModal.close();
}

/*---------------------------------------------------------------------------*/
/*                               Event Listeners                             */
/*---------------------------------------------------------------------------*/

const handleEditClick = () => {
  InputProfileForm();
  formProfileEditModal.open();
};

profileEditButton.addEventListener("click", handleEditClick);

function handleAddCardFormSubmit({ title, description }) {
  const cardData = {
    name: title,
    link: description,
  };

  const card = renderCard(cardData);
  cardSection.addItem(card);
  addCardPopup.close();
}

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
  cardFormValidator.toggleButtonState();
});

function renderCard(cardData) {
  const card = new Card(cardData, selectors.cardTemplate, (imgData) => {
    cardPreviewPopup.open(imgData);
  });

  return card.getView();
}

const cardPreviewPopup = new PopupWithImage(selectors);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleImageClick: (imgData) => {
            cardPreviewPopup.open(imgData);
          },
        },
        selectors.cardTemplate
      );
      cardSection.addItem(card.getView());
    },
  },
  selectors.cardSection
);

// Initiallize all my instances
cardSection.renderItems();
cardPreviewPopup.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

// All the rest
const formProfileEditModal = new PopupWithForm(
  selectors.profileEditModal,
  handleProfileEditSubmit
);
formProfileEditModal.setEventListeners();

export { cardPreviewPopup };
export { formProfileEditModal };
