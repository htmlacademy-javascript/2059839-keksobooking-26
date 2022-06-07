function getPositiveRandomInt(min, max) { //функция на генерацию случайного целого положительного числа
  //делаем проверку, что число "от" в диапазоне положительное
  if (min < 0) {
    const validationPositiveError = `min = ${min} - минимальное значение диапазона должно быть больше или равно 0. Измените минимальное значение.`;
    return validationPositiveError;
  }
  //делаем проверку, что число "от" меньше числа "до"
  if (min >= max) {
    const validationRangeError = `min = ${min} - минимальное значение больше или равно максимальному. Измените минимальное значение.`;
    return validationRangeError;
  }
  //проверки пройдены, генерим число
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min; //включение максимума и минимума
  return result;
}

getPositiveRandomInt(5, 9); //чтобы линтер не ругался

function getPositiveRandomFloat(min, max, numLength) { //функция на генерацию случайного дробного положительного числа
  //делаем проверку, что число "от" в диапазоне положительное
  if (min < 0) {
    const validationPositiveError = `min = ${min} - минимальное значение диапазона должно быть больше или равно 0. Измените минимальное значение.`;
    return validationPositiveError;
  }
  //делаем проверку, что число "от" меньше числа "до"
  if (min >= max) {
    const validationRangeError = `min = ${min} - минимальное значение больше или равно максимальному. Измените минимальное значение.`;
    return validationRangeError;
  }
  //проверки пройдены, генерим число
  const result = Math.random() * (max - min + 1) + min; //Максимум и минимум включаются
  return result.toFixed(numLength);
}

getPositiveRandomFloat(0.345, 6.789467, 4); //чтобы линтер не ругался
