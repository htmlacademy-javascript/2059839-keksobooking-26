const adFormContainerElement = document.querySelector('.ad-form');
const adFormChildrenElement = Array.from(adFormContainerElement.children);
const adFormSliderElement = adFormContainerElement.querySelector('.ad-form__slider');
const mapFilterContainerElement = document.querySelector('.map__filters');
const mapFilterChildrenElement = Array.from(mapFilterContainerElement.children);
const roomNumberElement = adFormContainerElement.querySelector( '[name="rooms"]');
const capacityElement = adFormContainerElement.querySelector( '[name="capacity"]');
const adTitleElement = adFormContainerElement.querySelector( '[name="title"]');
const adPriceElement = adFormContainerElement.querySelector( '[name="price"]');

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
    'min':'Минимальная цена: ',
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
    }
  },
};

const disablePage = () => {
  //Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
  adFormContainerElement.classList.add('ad-form--disabled');
  //Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset.
  adFormChildrenElement.forEach( (adFormItem) => {
    adFormItem.disabled = 'disabled';
  });
  //Слайдер также должен быть заблокирован;
  adFormSliderElement.disabled = 'disabled';
  //Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
  mapFilterContainerElement.classList.add('map__filters--disabled');

  mapFilterChildrenElement.forEach( (mapFilter) => {
    mapFilter.disabled = 'disabled';
  });
};

const enablePage = () => {
  //Форма заполнения информации об объявлении .ad-form не содержит класс ad-form--disabled;
  adFormContainerElement.classList.remove('ad-form--disabled');
  //Все интерактивные элементы формы .ad-form не содержат атрибут disabled
  adFormChildrenElement.forEach( (adFormItem) => {
    adFormItem.disabled = '';
  });
  //Слайдер должен быть разблокирован;
  adFormSliderElement.disabled = '';
  //Форма с фильтрами .map__filters разблокирована так же, как и форма .ad-form. Интерактивные элементы формы с фильтрами не содержат атрибуты disabled.
  mapFilterContainerElement.classList.remove('map__filters--disabled');
  mapFilterChildrenElement.forEach( (mapFilter) => {
    mapFilter.disabled = '';
  });
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
  adPriceElement.dataset.pristineRequiredMessage = (adFormValidationSetting.price.required) ?validationPrettyErrorText.required : '';
};

//функция на проверку входит ли кол-во комнат и кол-во мест в валидные сочетания
const validateRoomCapacity = () => adFormValidationSetting.capacity.roomNumberOption[roomNumberElement.value].includes(capacityElement.value);

//функция на возврат текста ошибки при невалидном выборе мест
const getCapacityErrorMessage = () => validationPrettyErrorText.capacity[roomNumberElement.value];

disablePage(); //чтобы линтер не ругался
enablePage(); //чтобы линтер не ругался
export {
  adFormContainerElement,
  roomNumberElement,
  capacityElement,
  setTitleValidationSettings,
  setPriceValidationSettings,
  validateRoomCapacity,
  getCapacityErrorMessage
};
