const adFormContainer = document.querySelector('.ad-form');
const adFormItemsList = Array.from(adFormContainer.children);
const adFormSlider = adFormContainer.querySelector('.ad-form__slider');
const mapFiltersContainer = document.querySelector('.map__filters');
const mapFiltersList = Array.from(mapFiltersContainer.children);

//функция на переключение состояний, принимает на вход true для активации страницы, false - для деактивации
const activatePage = function (parameter = true) {
  const errorMessage = 'Function parameter is incorrect. Correct parameters: true - to activate page, false - to inactivate page.';

  if (parameter) {
    //Форма заполнения информации об объявлении .ad-form не содержит класс ad-form--disabled;
    adFormContainer.classList.remove('ad-form--disabled');
    //Все интерактивные элементы формы .ad-form не содержат атрибут disabled
    adFormItemsList.forEach( (adFormItem) => {
      adFormItem.removeAttribute('disabled', '');
    });
    //Слайдер должен быть разблокирован;
    adFormSlider.removeAttribute('disabled', '');
    //Форма с фильтрами .map__filters разблокирована так же, как и форма .ad-form. Интерактивные элементы формы с фильтрами не содержат атрибуты disabled.
    mapFiltersContainer.classList.remove('map__filters--disabled');
    mapFiltersList.forEach( (mapFilter) => {
      mapFilter.removeAttribute('disabled', '');
    });
  } else if (!parameter) {
    //Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
    adFormContainer.classList.add('ad-form--disabled');
    //Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset.
    adFormItemsList.forEach( (adFormItem) => {
      adFormItem.setAttribute('disabled', '');
    });
    //Слайдер также должен быть заблокирован;
    adFormSlider.setAttribute('disabled', '');
    //Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
    mapFiltersContainer.classList.add('map__filters--disabled');

    mapFiltersList.forEach( (mapFilter) => {
      mapFilter.setAttribute('disabled', '');
    });
  } else {
    return errorMessage;
  }
};

export {activatePage};
