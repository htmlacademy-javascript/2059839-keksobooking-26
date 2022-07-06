const adFormContainerElement = document.querySelector('.ad-form');
const adFormChildrenElement = Array.from(adFormContainerElement.children);
const adFormSliderElement = adFormContainerElement.querySelector('.ad-form__slider');
const mapFilterContainerElement = document.querySelector('.map__filters');
const mapFilterChildrenElement = Array.from(mapFilterContainerElement.children);

const disableMapFilter = () => {
  mapFilterContainerElement.classList.add('map__filters--disabled');

  mapFilterChildrenElement.forEach( (mapFilter) => {
    mapFilter.disabled = true;
  });
};

const enableMapFilter = () => {
  mapFilterContainerElement.classList.remove('map__filters--disabled');
  mapFilterChildrenElement.forEach( (mapFilter) => {
    mapFilter.disabled = false;
  });
};

const disablePage = () => {
  //Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
  adFormContainerElement.classList.add('ad-form--disabled');
  //Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset.
  adFormChildrenElement.forEach( (adFormItem) => {
    adFormItem.disabled = true;
  });
  //Слайдер также должен быть заблокирован;
  adFormSliderElement.disabled = true;
  //Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
  disableMapFilter();
};

const enablePage = () => {
  //Форма заполнения информации об объявлении .ad-form не содержит класс ad-form--disabled;
  adFormContainerElement.classList.remove('ad-form--disabled');
  //Все интерактивные элементы формы .ad-form не содержат атрибут disabled
  adFormChildrenElement.forEach( (adFormItem) => {
    adFormItem.disabled = false;
  });
  //Слайдер должен быть разблокирован;
  adFormSliderElement.disabled = false;
  //Форма с фильтрами .map__filters разблокирована так же, как и форма .ad-form. Интерактивные элементы формы с фильтрами не содержат атрибуты disabled.
  enableMapFilter();
};

export {
  adFormContainerElement,
  adFormSliderElement,
  enablePage,
  disablePage,
  disableMapFilter
};
