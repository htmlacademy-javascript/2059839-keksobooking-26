const adFormContainerElement = document.querySelector('.ad-form');
const adFormChildrenElement = Array.from(adFormContainerElement.children);
const adFormSliderElement = adFormContainerElement.querySelector('.ad-form__slider');
const mapFilterContainerElement = document.querySelector('.map__filters');
const mapFilterChildrenElement = Array.from(mapFilterContainerElement.children);

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

export {
  adFormContainerElement,
  enablePage,
  disablePage
};
