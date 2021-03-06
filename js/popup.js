import {isEscPressed} from './util.js';
const typeMap = {
  palace: 'Дворец',
  flat:'Квартира',
  house:'Дом',
  bungalow:'Бунгало',
  hotel:'Отель'
};

const popupPrettyText = {
  guest:{
    '0':'не для гостей',
    '1':'для 1 гостя',
    '2':'для 2-х гостей',
    '3':'для 3-х гостей'
  },
  room:{
    '1':'1 комната',
    '2':'2 комнаты',
    '3':'3 комнаты',
    '100':'100 комнат'
  }
};

const popupTemplateElement = document.querySelector('#card').content.querySelector('.popup');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');

const createPopup = (element) => {
  const newPopupElement = popupTemplateElement.cloneNode(true);
  const featureListElement = newPopupElement.querySelectorAll('.popup__feature');
  const photosListElement = newPopupElement.querySelector('.popup__photos');
  const newPhotoTemplateElement = photosListElement.querySelector('.popup__photo');

  newPopupElement.querySelector('.popup__title').textContent = element.offer.title;
  newPopupElement.querySelector('.popup__text--address').textContent = element.offer.address;
  newPopupElement.querySelector('.popup__text--price').textContent = `${element.offer.price} `;
  newPopupElement.querySelector('.popup__text--price').insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');
  newPopupElement.querySelector('.popup__text--capacity').textContent = `${popupPrettyText.room[element.offer.rooms]} ${popupPrettyText.guest[element.offer.guests]}`;
  newPopupElement.querySelector('.popup__type').textContent = typeMap[element.offer.type];
  newPopupElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  if (element.offer.features === undefined) {
    newPopupElement.querySelector('.popup__features').remove();
  } else {
    const modifiers = element.offer.features.map( (feature) => `popup__feature popup__feature--${feature}` );

    featureListElement.forEach( (featureElement) => {
      const modifier = featureElement.className;

      if ( !modifiers.includes(modifier) ) {
        featureElement.remove();
      }
    });
  }

  if (element.offer.description === undefined) {
    newPopupElement.querySelector('.popup__description').remove();
  } else {
    newPopupElement.querySelector('.popup__description').textContent = element.offer.description;
  }

  if (element.offer.photos === undefined) {
    photosListElement.remove();
  } else {
    element.offer.photos.forEach((item) => {
      const newPhotoElement = newPhotoTemplateElement.cloneNode(true);
      newPhotoElement.src = item;
      photosListElement.appendChild(newPhotoElement);
    });
    photosListElement.children[0].remove();
  }

  newPopupElement.querySelector('.popup__avatar').src = element.author.avatar;
  return newPopupElement;
};

const onSuccessPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    removeSuccessMessagePopup();
  }
};

const onSuccessPopupClick = () => removeSuccessMessagePopup();

const onErrorPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    removeErrorMessagePopup();
  }
};

const onErrorPopupClick = () => removeErrorMessagePopup();

const showSuccessMessagePopup = () => {
  const successMessageElement = successMessageTemplateElement.cloneNode(true);
  document.body.appendChild(successMessageElement);
  document.addEventListener('click', onSuccessPopupClick);
  document.addEventListener('keydown', (evt) => onSuccessPopupEscKeydown(evt));
};

function removeSuccessMessagePopup () {
  document.body.querySelector('.success').remove();
  document.removeEventListener('click', onSuccessPopupClick);
  document.removeEventListener('keydown', (evt) => onSuccessPopupEscKeydown(evt));
}

const showErrorMessagePopup = () => {
  const errorMessageElement = errorMessageTemplateElement.cloneNode(true);
  document.body.appendChild(errorMessageElement);
  document.addEventListener('click', onErrorPopupClick);
  document.addEventListener('keydown', onErrorPopupEscKeydown);
};

function removeErrorMessagePopup () {
  document.body.querySelector('.error').remove();
  document.removeEventListener('click', onErrorPopupClick);
  document.removeEventListener('keydown', onErrorPopupEscKeydown);
}

export {
  createPopup,
  showSuccessMessagePopup,
  showErrorMessagePopup
};
