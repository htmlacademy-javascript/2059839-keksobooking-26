import {createAdExamples} from './data.js';
//мапа для типов
const typeMap = {
  palace: 'Дворец',
  flat:'Квартира',
  house:'Дом',
  bungalow:'Бунгало',
  hotel:'Отель'
};
const adExamples = createAdExamples();
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const popupPlace = document.querySelector('#map-canvas'); //сюда надо отрисовать 1 попап

//функция на заполнение попапа по шаблону
const createPopup = function (element) {
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
  if (element.offer.features.length === 0) {
    featureList.forEach( (featureListItem) => {
      featureListItem.classList.add('visually-hidden');
    });
  } else {
    //делаем мапу для дальнейшего сравнения с классами
    const modifiers = element.offer.features.map( (feature) => `popup__feature--${feature}` );
    //удаляем ненужные features
    featureList.forEach( (featureListItem) => {
      if (!modifiers.includes( featureListItem.classList[1]) ) {
        featureListItem.remove(); //тут удаляем, есть вариант еще прятать добавляя класс 'visually-hidden'
      }
    });
  }
  //В блок .popup__description выведите описание объекта недвижимости offer.description.
  if (element.offer.description.length === 0) {
    newPopup.querySelector('.popup__description').classList.add('visually-hidden');
    newPopup.querySelector('.popup__description').textContent = ''; //кмк необязательно текст шаблона описания тереть, но хочу - он не нужен
  } else {
    newPopup.querySelector('.popup__description').textContent = element.offer.description;
  }
  //В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.

  const photosList = newPopup.querySelector('.popup__photos');
  const newPhotoTemplate = photosList.querySelector('.popup__photo');

  if (element.offer.photos.length === 0) {
    photosList.classList.add('visually-hidden');
  } else {
    element.offer.photos.forEach((e, i) => {
      const newImg = newPhotoTemplate.cloneNode(true);
      newImg.src = element.offer.photos[i];
      photosList.appendChild(newImg);
    });
    photosList.children[0].remove(); //удаляем шаблон,с которого копировали
  }

  //Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
  newPopup.querySelector('.popup__avatar').src = element.author.avatar;

  return newPopup;
};

//Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.
popupPlace.appendChild(createPopup(adExamples[0]));
