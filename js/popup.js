//мапа для типов
const typeMap = {
  palace: 'Дворец',
  flat:'Квартира',
  house:'Дом',
  bungalow:'Бунгало',
  hotel:'Отель'
};
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

//функция на заполнение попапа по шаблону
const createPopup = (element) => {
  const newPopup = popupTemplate.cloneNode(true);
  //Выведите заголовок объявления offer.title в заголовок .popup__title.
  newPopup.querySelector('.popup__title').textContent = element.offer.title;
  //Выведите адрес offer.address в блок .popup__text--address.
  newPopup.querySelector('.popup__text--address').textContent = element.offer.address;
  //Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  newPopup.querySelector('.popup__text--price').textContent = `${element.offer.price} `;
  //в шаблоне есть span <p class="popup__text popup__text--price">5200 <span>₽/ночь</span></p>
  newPopup.querySelector('.popup__text--price').insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');
  //Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
  newPopup.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  //В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
  newPopup.querySelector('.popup__type').textContent = typeMap[element.offer.type];
  //Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
  newPopup.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  //В список .popup__features выведите все доступные удобства в объявлении.
  const featureList = newPopup.querySelectorAll('.popup__feature');
  //проверяем что фичи пришли
  if (element.offer.features === undefined) {
    newPopup.querySelector('.popup__features').remove();
  } else {
    //делаем мапу для дальнейшего сравнения с классами
    const modifiers = element.offer.features.map( (feature) => `popup__feature--${feature}` );
    //удаляем ненужные features
    featureList.forEach( (featureListItem, i) => {
      if ( !featureListItem.classList.contains(modifiers[i]) ) {
        featureListItem.remove(); //тут удаляем, есть вариант еще прятать добавляя класс 'visually-hidden'
      }
    });
  }
  //В блок .popup__description выведите описание объекта недвижимости offer.description.
  if (element.offer.description === undefined) {
    newPopup.querySelector('.popup__description').remove(); //злобный смех
  } else {
    newPopup.querySelector('.popup__description').textContent = element.offer.description;
  }
  //В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.

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
    photosList.children[0].remove(); //удаляем шаблон,с которого копировали
  }

  //Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
  newPopup.querySelector('.popup__avatar').src = element.author.avatar;

  return newPopup;
};

/*
 Если отправка данных прошла успешно, показывается соответствующее сообщение. Разметку сообщения, которая находится в блоке #success внутри шаблона template, нужно разместить перед закрывающим тегом </body>. Сообщение должно исчезать по нажатию на клавишу Esc и по клику на произвольную область экрана.

2.7. Если при отправке данных произошла ошибка запроса, показывается соответствующее сообщение. Разметку сообщения, которая находится в блоке #error в шаблоне template, нужно разместить перед закрывающим тегом </body>. Сообщение должно исчезать после нажатия на кнопку .error__button, по нажатию на клавишу Esc и по клику на произвольную область экрана. В таком случае вся введённая пользователем информация сохраняется, чтобы у него была возможность отправить форму повторно.
*/

const prepareSuccessMessagePopup = () => {
  const newSuccessMessageElement = successMessageTemplate.cloneNode(true);
  newSuccessMessageElement.classList.add('visually-hidden');
  document.querySelector('body').appendChild(newSuccessMessageElement);
};
const prepareErrorMessagePopup = () => {
  const newErrorMessageElement = errorMessageTemplate.cloneNode(true);
  newErrorMessageElement.classList.add('visually-hidden');
  document.querySelector('body').appendChild(newErrorMessageElement);
};



const onSuccessPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    hideSuccessMessagePopup();
  }
};

const onSuccessPopupClick = () => {
  hideSuccessMessagePopup();
};

const onErrorPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    hideErrorMessagePopup();
  }
};

const onErrorPopupClick = () => {
  hideErrorMessagePopup();
};

const showSuccessMessagePopup = () => {
  document.querySelector('success').classList.remove('visually-hidden');
  document.addEventListener('click', onSuccessPopupClick);
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
  //добавляем листенер на клик
  //добавляем листенер на esc
};

function hideSuccessMessagePopup () {
  document.querySelector('success').classList.add('visually-hidden');
  document.removeEventListener('click', onSuccessPopupClick);
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  //добавляем листенер на клик
  //добавляем листенер на esc
}

const showErrorMessagePopup = () => {
  document.querySelector('.error').classList.remove('visually-hidden');
  document.addEventListener('click', onErrorPopupClick);
  document.addEventListener('keydown', onErrorPopupEscKeydown);
  //добавляем листенер на клик
  //добавляем листенер на esc
};

function hideErrorMessagePopup () {
  document.querySelector('.error').classList.add('visually-hidden');
  document.removeEventListener('click', onErrorPopupClick);
  document.removeEventListener('keydown', onErrorPopupEscKeydown);
  //добавляем листенер на клик
  //добавляем листенер на esc
}

prepareSuccessMessagePopup();
prepareErrorMessagePopup();

export {
  createPopup,
  showSuccessMessagePopup,
  showErrorMessagePopup
};
