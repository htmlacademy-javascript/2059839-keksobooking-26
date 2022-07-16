const typeMap = {
  palace: 'Дворец',
  flat:'Квартира',
  house:'Дом',
  bungalow:'Бунгало',
  hotel:'Отель'
};
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');

const createPopup = (element) => {
  const newPopup = popupTemplate.cloneNode(true);
  newPopup.querySelector('.popup__title').textContent = element.offer.title;
  newPopup.querySelector('.popup__text--address').textContent = element.offer.address;
  newPopup.querySelector('.popup__text--price').textContent = `${element.offer.price} `;
  newPopup.querySelector('.popup__text--price').insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');
  newPopup.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  newPopup.querySelector('.popup__type').textContent = typeMap[element.offer.type];
  newPopup.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  const featureList = newPopup.querySelectorAll('.popup__feature');

  if (element.offer.features === undefined) {
    newPopup.querySelector('.popup__features').remove();
  } else {
    const modifiers = element.offer.features.map( (feature) => `popup__feature popup__feature--${feature}` );

    featureList.forEach( (featureListItem) => {
      const modifier = featureListItem.className;

      if ( !modifiers.includes(modifier) ) {
        featureListItem.remove();
      }
    });
  }

  if (element.offer.description === undefined) {
    newPopup.querySelector('.popup__description').remove();
  } else {
    newPopup.querySelector('.popup__description').textContent = element.offer.description;
  }

  const photosList = newPopup.querySelector('.popup__photos');
  const newPhotoTemplate = photosList.querySelector('.popup__photo');

  if (element.offer.photos === undefined) {
    photosList.remove();
  } else {
    element.offer.photos.forEach((item) => {
      const newImg = newPhotoTemplate.cloneNode(true);
      newImg.src = item;
      photosList.appendChild(newImg);
    });
    photosList.children[0].remove();
  }

  newPopup.querySelector('.popup__avatar').src = element.author.avatar;
  return newPopup;
};

const onSuccessPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    removeSuccessMessagePopup();
  }
};

const onSuccessPopupClick = () => {
  removeSuccessMessagePopup();
};

const onErrorPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    removeErrorMessagePopup();
  }
};

const onErrorPopupClick = () => {
  removeErrorMessagePopup();
};

const showSuccessMessagePopup = () => {
  const successMessageElement = successMessageTemplateElement.cloneNode(true);
  document.body.appendChild(successMessageElement);
  document.addEventListener('click', onSuccessPopupClick);
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
};

function removeSuccessMessagePopup () {
  document.body.querySelector('.success').remove();
  document.removeEventListener('click', onSuccessPopupClick);
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
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
