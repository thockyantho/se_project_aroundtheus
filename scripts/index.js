/*----------------------------------------------*/
/*                  Elements                    */
/*----------------------------------------------*/

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Wrapper
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__card-list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const ImageModal = document.querySelector("#card__image");

// Buttons etc.
const addNewCardButton = document.querySelector(".profile__add-button");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-close-button"
);
const profileEditButton = document.querySelector("#profile-edit-button");

// Inputs
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const previewImageModal = document.querySelector("#preview-image");
const previewImageClose = document.querySelector("#preview-image-close");

/*-----------------------------------------------*/
/*                  Functions                    */
/*-----------------------------------------------*/
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  //   clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  // search go the like button
  const likeButton = cardElement.querySelector(".card__like-button");
  // find delete button
  const trashButton = cardElement.querySelector(".card__trash-button");
  // add the event listner to the delete button
  trashButton.addEventListener("click", () => {
    // cardElement.remove();
    cardElement.remove();
  });

  const imgPreview = previewImageModal.querySelector(
    ".modal__card-image-preview"
  );
  const titlePreview = previewImageModal.querySelector(".modal__title-preview");

  // add click listener to the cardImage element
  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    imgPreview.src = cardData.link;
    titlePreview.textContent = cardData.name;
  });
  // openModal with previewImageModal

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  // set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}

previewImageClose.addEventListener("click", () =>
  closeModal(previewImageModal)
);

// function openModal() {
//   profileNameInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;

//   profileEditModal.classList.add("modal_opened");
// }
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModal);
};

/*-----------------------------------------------------*/
/*                  Event Handlers                     */
/*-----------------------------------------------------*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  addCardFormElement.reset();
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
}

/*-----------------------------------------------------*/
/*                  Event Listeners                    */
/*-----------------------------------------------------*/
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
// add new card
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// const likeButtons = document.querySelectorAll(".card__like-button");
// likeButtons.forEach((likeButton) => {
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });
// });
