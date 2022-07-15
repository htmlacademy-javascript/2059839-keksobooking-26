const ALERT_SHOW_TIME = 10000;

//функция на генерацию случайного целого положительного числа
const getPositiveRandomInt = (min, max) => {
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

const cutNumber = (num, numLength) => parseFloat( num.toFixed(numLength) );

//функция на генерацию случайного дробного положительного числа
const getPositiveRandomFloat = (min, max, numLength = 1) => { //функция на генерацию случайного дробного положительного числа
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
  return cutNumber( (Math.random() * (max - min + 1) + min), numLength ); //Максимум и минимум включаются
};

// функция на получение рандомного элемента массива
const getRandomArrayElement = (element)  => element[getPositiveRandomInt(0, element.length - 1)];

// функция на перемешку элементов массива - необязательная, для красоты в примерах
//источник: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
const shuffle = (array) => {
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
const getRandomArrayLength = (array) => {
  shuffle(array);
  return array.slice(0,getPositiveRandomInt(1,array.length));
};

//функция на подготовку номеров для урлов аватаров
const getPrettyNumber = (number) => {
  if (number.toString().length === 1) {
    number = `0${number}`;
  }
  return number;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {
  getPositiveRandomInt,
  getPositiveRandomFloat,
  getRandomArrayElement,
  getRandomArrayLength,
  getPrettyNumber,
  cutNumber,
  showAlert,
  debounce
};
