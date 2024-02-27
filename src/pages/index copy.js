// import Card from "../components/Card.js";
// import FormValidator from "../components/FormValidator.js";
// import "../pages/index.css";
// import { closeModal, openModal } from "../utils/utils.js";
// /*----------------------------------------------*/
// /*                  Elements                    */
// /*----------------------------------------------*/
// const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];

// // Wrapper
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileEditForm = profileEditModal.querySelector(".modal__form");
// const addCardModal = document.querySelector("#add-card-modal");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
// const addCardFormElement = addCardModal.querySelector(".modal__form");

// // const profileForm = document.forms["profile-form"];
// // const cardForm = document.forms["card-form"];

// const cardListEl = document.querySelector(".cards__card-list");

// // Buttons etc.
// const addNewCardButton = document.querySelector(".profile__add-button");
// const profileModalCloseButton = profileEditModal.querySelector(
//   "#profile-close-button"
// );
// const addCardModalCloseButton = addCardModal.querySelector(
//   "#modal-close-button"
// );
// const profileEditButton = document.querySelector("#profile-edit-button");

// // Inputs
// const profileNameInput = document.querySelector("#profile-name-input");
// const profileDescriptionInput = document.querySelector(
//   "#profile-description-input"
// );
// const cardTitleInput = addCardFormElement.querySelector(
//   ".modal__input_type_title"
// );
// const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
// const previewImageModal = document.querySelector("#preview-image");
// const previewImageClose = document.querySelector("#preview-image-close");

// const cardSelector = "#card-template";

// /*------------------------------------------------*/
// /*                  Validation                    */
// /*------------------------------------------------*/

// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// const editFormValidator = new FormValidator(config, profileEditForm);
// const addFormValidator = new FormValidator(config, addCardFormElement);

// editFormValidator.enableValidation();
// addFormValidator.enableValidation();

// // const formValidators = {};

// // enable validation
// // const enableValidation = (config) => {
// //   const formList = Array.from(document.querySelectorAll(config.formSelector));
// //   formList.forEach((formElement) => {
// //     const validator = new FormValidator(config, formElement);
// //     // here you get the name of the form
// //     const formName = formElement.getAttribute("name");

// //     // here you store a validator by the `name` of the form
// //     formValidators[formName] = validator;
// //     validator.enableValidation();
// //   });
// // };

// // enableValidation(config);

// /*-----------------------------------------------*/
// /*                  Functions                    */
// /*-----------------------------------------------*/

// previewImageClose.addEventListener("click", () =>
//   closeModal(previewImageModal)
// );

// function renderCard(cardData, wrapper) {
//   const card = new Card(cardData, cardSelector);
//   const cardElement = card.getView();
//   wrapper.prepend(cardElement);
// }

// /*-----------------------------------------------------*/
// /*                  Event Handlers                     */
// /*-----------------------------------------------------*/
// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileNameInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closeModal(profileEditModal);
// }

// function handleAddCardFormSubmit(e) {
//   e.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   addCardFormElement.reset();

//   renderCard({ name, link }, cardListEl);
//   closeModal(addCardModal);
// }

// /*-----------------------------------------------------*/
// /*                  Event Listeners                    */
// /*-----------------------------------------------------*/

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// profileEditButton.addEventListener("click", () => {
//   profileNameInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openModal(profileEditModal);
//   editFormValidator.resetValidation();
// });
// profileModalCloseButton.addEventListener("click", () =>
//   closeModal(profileEditModal)
// );

// // add new card
// addNewCardButton.addEventListener("click", () => {
//   addCardFormElement.reset();
//   addFormValidator.resetValidation();
//   openModal(addCardModal);
// });
// addCardModalCloseButton.addEventListener("click", () =>
//   closeModal(addCardModal)
// );

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// [profileEditModal, addCardModal, previewImageModal].forEach((modal) => {
//   modal.addEventListener("mousedown", (event) => {
//     if (event.target.classList.contains("modal")) {
//       closeModal(modal);
//     }
//   });
// });

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
