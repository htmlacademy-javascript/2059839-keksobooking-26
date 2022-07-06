import {adFormContainerElement} from './form.js';
import {
  cutNumber,
  showAlert
} from './util.js';
import {sendData} from './api.js';
import {
  showSuccessMessagePopup,
  showErrorMessagePopup
} from './popup.js';

const roomNumberElement = adFormContainerElement.querySelector( '[name="rooms"]');
const capacityElement = adFormContainerElement.querySelector( '[name="capacity"]');
const adTitleElement = adFormContainerElement.querySelector( '[name="title"]');
const adPriceElement = adFormContainerElement.querySelector( '[name="price"]');
const adAddressElement = adFormContainerElement.querySelector( '[name="address"]');
const adTypeElement = adFormContainerElement.querySelector( '[name="type"]');
const adTimeInElement = adFormContainerElement.querySelector( '[name="timein"]');
const adTimeOutElement = adFormContainerElement.querySelector( '[name="timeout"]');

//читабельные тексты ошибок
const validationPrettyErrorText = {
  'required':'Обязательное поле',
  'capacity': {
    '1': 'В 1 комнате можно указать только 1 место',
    '2': 'В 2 комнатах можно указать от 1 до 2-х мест',
    '3': 'В 3 комнатах можно указать от 1 до 3-х мест',
    '100': 'В 100 комнатах можно указать только вариант "не для гостей"'
  },
  'title':{
    'minLength': 'Минимальная длина 30 символов',
    'maxLength': 'Максимальная длина 100 символов',
  },
  'price':{
    'min':'Для выбраного типа жилья цена должна быть от ',
    'max':'Максимальная цена 100 000 руб.'
  }
};

//сеттинги для валидации полей
const adFormValidationSetting = {
  'title':{
    required:true,
    minLength:30,
    maxLength:100
  },
  'price':{
    required:true,
    max:100000,
    min:{
      'bungalow':0,
      'flat':1000,
      'hotel':3000,
      'house':5000,
      'palace':10000
    }
  },
  'capacity':{
    //валидные варианты сочетаний value кол-ва мест + кол-ва комнат
    roomNumberOption:{
      '1':['1'],
      '2':['1','2'],
      '3':['1','2','3'],
      '100':['0']
    },
  },
  'address':{
    'required':true,
    'readonly':true,
    startPosition:{
      lat:35.68173,
      lng:139.75398,
    },
    coordinateNumLength:5
  }
};

//функция на установку атрибутов с лимитами для заголовка
const setTitleValidationSettings = () => {
  //атрибуты для проверок
  adTitleElement.minLength = adFormValidationSetting.title.minLength;
  adTitleElement.maxLength = adFormValidationSetting.title.maxLength;
  adTitleElement.required = (adFormValidationSetting.title.required) ? 'required' : '';
  //тексты ошибок
  adTitleElement.dataset.pristineMinlengthMessage = validationPrettyErrorText.title.minLength;
  adTitleElement.dataset.pristineMaxlengthMessage = validationPrettyErrorText.title.maxLength;
  adTitleElement.dataset.pristineRequiredMessage = (adFormValidationSetting.title.required) ? validationPrettyErrorText.required : '';
};

//функция на установку атрибутов с лимитами для поля цен
const setPriceValidationSettings = () => {
  //атрибуты для проверок
  adPriceElement.max = adFormValidationSetting.price.max;
  adPriceElement.required = (adFormValidationSetting.price.required) ? 'required' : '';
  //тексты ошибок
  adPriceElement.dataset.pristineMaxMessage = validationPrettyErrorText.price.max;
  adPriceElement.dataset.pristineRequiredMessage = (adFormValidationSetting.price.required) ? validationPrettyErrorText.required : '';
};

//функция на генерацию адреса нужного формата
const prepareAddressValue = (point, coordinateLength) => `${cutNumber(point.lat, coordinateLength)}, ${cutNumber(point.lng, coordinateLength)}`;

//функция на установку сетингов для адреса
const setAddressValidationSettings = () => {
  //указываем дефолтный адрес
  adAddressElement.value = prepareAddressValue(adFormValidationSetting.address.startPosition, adFormValidationSetting.address.coordinateNumLength);
  //пишем сэмпл адреса, т.к. поле обязательное и доступно только на чтение - в будущем тут будут автомато координаты с карты
  adAddressElement.readOnly = (adFormValidationSetting.address.readonly) ? 'readonly' : '';
  //атрибуты для проверок
  adAddressElement.required = (adFormValidationSetting.address.required) ? 'required' : '';
  //тексты ошибок
  adAddressElement.dataset.pristineRequiredMessage = (adFormValidationSetting.address.required) ? validationPrettyErrorText.required : '';
};

//функция на проверку входит ли кол-во комнат и кол-во мест в валидные сочетания
const validateRoomCapacity = () => adFormValidationSetting.capacity.roomNumberOption[roomNumberElement.value].includes(capacityElement.value);

//функция на возврат текста ошибки при невалидном выборе мест
const getCapacityErrorMessage = () => validationPrettyErrorText.capacity[roomNumberElement.value];

const validateMinPrice = () => Number(adPriceElement.value) >= Number(adFormValidationSetting.price.min[adTypeElement.value]);

const getMinPriceErrorMessage = () => `${validationPrettyErrorText.price.min}${adFormValidationSetting.price.min[adTypeElement.value]} руб.`;
//выставляем настройки в дом перед созданием валидатора
setTitleValidationSettings();
setPriceValidationSettings();
setAddressValidationSettings();

//конфиги для валидации
const pristine = new Pristine(adFormContainerElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
},true);

pristine.addValidator(capacityElement, validateRoomCapacity, getCapacityErrorMessage);
pristine.addValidator(adPriceElement, validateMinPrice, getMinPriceErrorMessage);

const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
};

const onTypeChange = () => {
  adPriceElement.min = adFormValidationSetting.price.min[adTypeElement.value];
  adPriceElement.placeholder = adFormValidationSetting.price.min[adTypeElement.value];
  pristine.validate(adPriceElement);
};

const onPriceChange = () => {
  pristine.validate(adPriceElement);
};
const onTimeOutChange = () => {
  adTimeInElement.value = adTimeOutElement.value;
};
const onTimeInChange = () => {
  adTimeOutElement.value = adTimeInElement.value;
};

roomNumberElement.addEventListener('change',onRoomNumberChange);
adTypeElement.addEventListener('change',onTypeChange);
adPriceElement.addEventListener('change',onPriceChange);
adTimeOutElement.addEventListener('change',onTimeOutChange);
adTimeInElement.addEventListener('change',onTimeInChange);

const setUserFormSubmit = () => {
  adFormContainerElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
//Реализуйте возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю.
//Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение.
      console.log('if (pristine.validate()) {');
      console.log(evt);

      sendData(
        showSuccessMessagePopup,
        //(evt) => showSuccessMessagePopup(evt),
        showErrorMessagePopup,
        new FormData(evt.target)
      );
    }
  });
};

export {
  adAddressElement,
  adPriceElement,
  adTypeElement,
  adFormValidationSetting,
  onPriceChange,
  prepareAddressValue,
  setUserFormSubmit
};
