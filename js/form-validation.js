const adFormContainerElement = document.querySelector('.ad-form');
const adTitleElement = adFormContainerElement.querySelector( '[name="title"]');
const adTypeElement = adFormContainerElement.querySelector( '[name="type"]');
const adPriceElement = adFormContainerElement.querySelector( '[name="price"]');
const roomNumberElement = adFormContainerElement.querySelector( '[name="rooms"]');
const capacityElement = adFormContainerElement.querySelector( '[name="capacity"]');
const adTimeInElement = adFormContainerElement.querySelector( '[name="timein"]');
const adTimeOutElement = adFormContainerElement.querySelector( '[name="timeout"]');
const adAddressElement = adFormContainerElement.querySelector( '[name="address"]');

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
    'readonly':true
  }
};

//функция на установку атрибутов с лимитами для заголовка
const setTitleValidationSettings = () => {
  //атрибуты для проверок
  adTitleElement.minLength = adFormValidationSetting.title.minLength;
  adTitleElement.maxLength = adFormValidationSetting.title.maxLength;
  adTitleElement.required = adFormValidationSetting.title.required;
  //тексты ошибок
  adTitleElement.dataset.pristineMinlengthMessage = validationPrettyErrorText.title.minLength;
  adTitleElement.dataset.pristineMaxlengthMessage = validationPrettyErrorText.title.maxLength;
  adTitleElement.dataset.pristineRequiredMessage = (adFormValidationSetting.title.required) ? validationPrettyErrorText.required : '';
};

const setPriceRelativeAttribute = () => {
  adPriceElement.min = adFormValidationSetting.price.min[adTypeElement.value];
  adPriceElement.placeholder = adFormValidationSetting.price.min[adTypeElement.value];
};

//функция на установку атрибутов с лимитами для поля цен
const setPriceValidationSettings = () => {
  //атрибуты для проверок
  adPriceElement.max = adFormValidationSetting.price.max;
  adPriceElement.required = adFormValidationSetting.price.required;
  adPriceElement.placeholder = adFormValidationSetting.price.min[adTypeElement.value];
  //тексты ошибок
  adPriceElement.dataset.pristineMaxMessage = validationPrettyErrorText.price.max;
  adPriceElement.dataset.pristineRequiredMessage = (adFormValidationSetting.price.required) ? validationPrettyErrorText.required : '';
};

//функция на установку сетингов для адреса
const setAddressValidationSettings = () => {
  adAddressElement.readOnly = adFormValidationSetting.address.readonly;
  //атрибуты для проверок
  adAddressElement.required = adFormValidationSetting.address.required;
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

const validateUserForm = (element) => pristine.validate(element);

const onRoomNumberChange = () => {
  validateUserForm(capacityElement);
};

const onTypeChange = () => {
  adPriceElement.min = adFormValidationSetting.price.min[adTypeElement.value];
  adPriceElement.placeholder = adFormValidationSetting.price.min[adTypeElement.value];
  validateUserForm(adPriceElement);
};

const onPriceChange = (cb) => {
  cb();
  validateUserForm(adPriceElement);
};
const onTimeOutChange = () => {
  adTimeInElement.value = adTimeOutElement.value;
};
const onTimeInChange = () => {
  adTimeOutElement.value = adTimeInElement.value;
};

const setAdRoomElementListener = () => roomNumberElement.addEventListener('change',onRoomNumberChange);
const setAdTypeElementListener = () => adTypeElement.addEventListener('change',onTypeChange);
const setAdTimeOutElementListener = () => adTimeOutElement.addEventListener('change',onTimeOutChange);
const setAdPriceElementListener = (cb) => adPriceElement.addEventListener('change', () => onPriceChange(cb));
const setAdTimeInElementListener = () => adTimeInElement.addEventListener('change',onTimeInChange);

export {
  adFormValidationSetting,
  validateUserForm,
  setPriceRelativeAttribute,
  setAdRoomElementListener,
  setAdTypeElementListener,
  setAdTimeOutElementListener,
  setAdPriceElementListener,
  setAdTimeInElementListener
};
