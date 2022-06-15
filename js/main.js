//кол-во примеров объявлений
const EXAMPLE_AD_COUNT = 10;
//заголовки объявлений
const titles = [
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
const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
//временные интервалы чекинов-чекаутов
const timeRanges = [
  '12:00',
  '13:00',
  '14:00'
];
//список удобств
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
//список описаний
const descriptions = [
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
const photoUrls = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
//промежутки для координат
const coordinateRange = {
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

//функция на генерацию случайного целого положительного числа
const getPositiveRandomInt = function (min, max) {
  //делаем проверку, что число "от" в диапазоне положительное
  if (min < 0) {
    const validationPositiveError = `min = ${min} - минимальное значение диапазона должно быть больше или равно 0. Измените минимальное значение.`;
    return validationPositiveError;
  }
  //делаем проверку, что число "от" меньше числа "до"
  if (min >= max) {
    const validationRangeError = `min = ${min} - минимальное значение больше или равно максимальному. Проверьте вводимый диапазон.`;
    return validationRangeError;
  }
  //проверки пройдены, генерим число
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //включение максимума и минимума
};

//функция на генерацию случайного дробного положительного числа
const getPositiveRandomFloat = function (min, max, numLength = 1) { //функция на генерацию случайного дробного положительного числа
  //делаем проверку, что число "от" в диапазоне положительное
  if (min < 0) {
    const validationPositiveError = `min = ${min} - минимальное значение диапазона должно быть больше или равно 0. Измените минимальное значение.`;
    return validationPositiveError;
  }
  //делаем проверку, что число "от" меньше числа "до"
  if (min >= max) {
    const validationRangeError = `min = ${min} - минимальное значение больше или равно максимальному. Проверьте вводимый диапазон.`;
    return validationRangeError;
  }
  //проверки пройдены, генерим число
  return (Math.random() * (max - min + 1) + min).toFixed(numLength); //Максимум и минимум включаются
};

// функция на получение рандомного элемента массива
const getRandomArrayElement = function (element) {
  return element[getPositiveRandomInt(0, element.length - 1)];
};

// функция на перемешку элементов массива - необязательная, для красоты в примерах
//источник: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
const shuffle = function (array) {
  let currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

//функция на генерацию массива случайной длины
const getRandomArrayLength = function (array) {
  shuffle(array);
  return array.slice(0,getPositiveRandomInt(1,array.length));
};

//функция на подготовку номеров для урлов аватаров
const getPrettyNumber = function (number) {
  if (number.toString().length === 1) {
    number = `0${number}`;
  }
  return number;
};

//функция на создвние объектов объявлений
const createAd = function(i) {
  //генерим координаты для адреса
  const coordinates = {
    lat: getPositiveRandomFloat(coordinateRange.lat.min, coordinateRange.lat.max, coordinateRange.coordinateAccuracy),
    lng: getPositiveRandomFloat(coordinateRange.lat.min, coordinateRange.lat.max, coordinateRange.coordinateAccuracy)
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
      title: getRandomArrayElement(titles),

      //address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.
      address: `${coordinates.lat}, ${coordinates.lng}`,

      //price, число — стоимость. Случайное целое положительное число.
      price: getPositiveRandomInt(1,100000),

      //type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
      type: getRandomArrayElement(types),

      //rooms, число — количество комнат. Случайное целое положительное число.
      rooms: getPositiveRandomInt(1, 5),

      //guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
      guests: getPositiveRandomInt(1, 8),

      //checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
      checkin: getRandomArrayElement(timeRanges),

      //checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
      checkout: getRandomArrayElement(timeRanges),

      //features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
      features: getRandomArrayLength(features),

      //description, строка — описание помещения. Придумайте самостоятельно.
      description: getRandomArrayElement(descriptions),
      //photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
      photos: getRandomArrayLength(photoUrls)
    }
  };

  return ad;
};

// генерим финальный массив объектов
const adExamples = Array.from({length: EXAMPLE_AD_COUNT}, (v,i) => createAd(i));

const testFunction = (array) => array.length; //чтобы линтер не ругался на неиспользуемый массив
testFunction(adExamples); //чтобы линтер не ругался на неиспользуемый массив
