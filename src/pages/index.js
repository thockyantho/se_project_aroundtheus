import "../pages/index.css";

// Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { closeModal, openModal } from "../utils/utils.js";
import Section from "../components/Section.js";
import { config, initialCards, selectors } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage";

// Create instances of the classes
const CardPreviewPopup = new PopupWithImage(selectors.previewPopup);

const CardSection = new Section(
  {
    // items: initialCards,
    renderer: (data) => {
      const cardEl = new Card(
        {
          data,
          handleImageClick: (imgData) => {
            CardPreviewPopup.open(imgData);
          },
        },
        selectors.cardTemplate
      );
      CardSection.addItem(cardEl.getView());
    },
  },
  selectors.cardSection
);

const editFormValidator = new FormValidator(config, editFormModalWindow);
const cardFormValidator = new FormValidator(config, cardFormModalWindow);
// Initiallize all my instances
CardSection.renderItems(initialCards);
CardPreviewPopup.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// All the rest
