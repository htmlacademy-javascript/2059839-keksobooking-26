function getPositiveRandomInt(min, max) {
  let result;

  //делаем проверку, что число "от" в диапазоне положительное
  if (min < 0) {
    console.log('min = ' + min + ' - минимальное значение диапазона должно быть больше или равно 0.');
  } else {
    //делаем проверку, что число "от" меньше числа "до"
    if (min >= max) {
      console.log('min = ' + min + ' - минимальное значение больше или равно максимальному. Измените минимальное значение.');
    } else {
      //проверки пройдены, генерим число
      min = Math.ceil(min);
      max = Math.floor(max);
      return result = Math.floor(Math.random() * (max - min + 1)) + min; //включение максимума и минимума
    };
  };
};

console.log(getPositiveRandomInt(5, 13));
function getPositiveRandomFloat (min, max, numLength) {
  let result;
  //делаем проверку, что число "от" в диапазоне положительное

  if (min < 0) {
    console.log('min = ' + min + ' - минимальное значение диапазона должно быть больше или равно 0. Измените минимальное значение.');
  } else {
    //делаем проверку, что число "от" меньше числа "до"
    if (min >= max) {
      console.log('min = ' + min + ' - минимальное значение больше или равно максимальному. Измените минимальное значение.');
    } else {
      //проверки пройдены, генерим число
      let result = Math.random() * (max - min + 1) + min; //Максимум и минимум включаются
      return result.toFixed(numLength);
    };
  };
};
