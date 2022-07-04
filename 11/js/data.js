import {getPositiveRandomInt, getPositiveRandomFloat, getRandomArrayElement, getRandomArrayLength, getPrettyNumber} from './util.js';
//кол-во примеров объявлений
const EXAMPLE_AD_COUNT = 10;
//заголовки объявлений
const TITLES = [
  'Супер-пупер апартаменты',
  'Квартира с клопами дёшего',
  'Коробка для вас и питомца',
  'Luxury apartment B&B',
  'Квартира с видом на кладбище',
  'Пентхаус такой что вам и не снилось',
  'Апартаменты без ничего',
  'Апартаменты у парка',
  'Квартира с красными шторами',
  'Комната в ночлежке'
];
//список типов размещений
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
//временные интервалы чекинов-чекаутов
const TIME_RANGES = [
  '12:00',
  '13:00',
  '14:00'
];
//список удобств
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
//список описаний
const DESCRIPTIONS = [
  'Уютные чистые просторные апартаменты со своей кухней и коробкой для кота.',
  'На прошлой неделе здесь произошло убийство, поэтому скидка. Спешите!',
  'Студия у чёрта на куличиках, зато недорого и трасса с лесом рядом.',
  'Потрясающие виды, джакузи есть, местным скидка.',
  'Хорошие апартаменты в транспортной доступности от основных достопримечательностей города.',
  'Крошечные апартаменты, зато недорого и с завтраком!',
  'Сдам хату только приезжим. Местных прошу не беспокоить.',
  'Уютная квартира со всеми удобствами.',
  'Хата с матрасом, в котором живут клопы.',
  'Комфортабельная студия с видом на реку.'
];
//список урлов с фоточками
const PHOTO_URLS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
//промежутки для координат
const COORDINATE_RANGE = {
  lat:{
    min: 35.65000,
    max: 35.70000
  },
  lng:{
    min: 139.70000,
    max: 139.80000
  },
  coordinateAccuracy:5
};

//функция на создвание объектов объявлений
const createAd = function(i) {
  //генерим координаты для адреса
  const coordinates = {
    lat: getPositiveRandomFloat(COORDINATE_RANGE.lat.min, COORDINATE_RANGE.lat.max, COORDINATE_RANGE.coordinateAccuracy),
    lng: getPositiveRandomFloat(COORDINATE_RANGE.lng.min, COORDINATE_RANGE.lng.max, COORDINATE_RANGE.coordinateAccuracy)
  };

  //генерим финальный объект
  const ad = {
    //author, объект — описывает автора. Содержит одно поле
    author: {
      //avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются
      avatar: `img/avatars/user${getPrettyNumber(i+1)}.png`
    },
    //location, объект — местоположение в виде географических координат. Состоит из двух полей
    location:{
      //lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
      lat: coordinates.lat,
      //lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
      lng: coordinates.lng
    },
    //offer, объект — содержит информацию об объявлении.
    offer:{
      //title, строка — заголовок предложения. Придумайте самостоятельно.
      title: getRandomArrayElement(TITLES),

      //address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.
      address: `${coordinates.lat}, ${coordinates.lng}`,

      //price, число — стоимость. Случайное целое положительное число.
      price: getPositiveRandomInt(1,100000),

      //type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
      type: getRandomArrayElement(TYPES),

      //rooms, число — количество комнат. Случайное целое положительное число.
      rooms: getPositiveRandomInt(1, 5),

      //guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
      guests: getPositiveRandomInt(1, 8),

      //checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
      checkin: getRandomArrayElement(TIME_RANGES),

      //checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
      checkout: getRandomArrayElement(TIME_RANGES),

      //features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
      features: getRandomArrayLength(FEATURES),

      //description, строка — описание помещения. Придумайте самостоятельно.
      description: getRandomArrayElement(DESCRIPTIONS),
      //photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
      photos: getRandomArrayLength(PHOTO_URLS)
    }
  };

  return ad;
};

// фунция на генерацию массив объектов объявлений
const createAdExamples = () => Array.from({length: EXAMPLE_AD_COUNT}, (v,i) => createAd(i));

export {createAdExamples};
