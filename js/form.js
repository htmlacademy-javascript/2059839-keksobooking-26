const adFormContainer = document.querySelector('.ad-form');
const adFormItemsList = Array.from(adFormContainer.children);
const adFormSlider = adFormContainer.querySelector('.ad-form__slider');
const mapFiltersContainer = document.querySelector('.map__filters');
const mapFiltersList = Array.from(mapFiltersContainer.children);


const disablePage = () => {
  //Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
  adFormContainer.classList.add('ad-form--disabled');
  //Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset.
  adFormItemsList.forEach( (adFormItem) => {
    adFormItem.disabled = 'disabled';
  });
  //Слайдер также должен быть заблокирован;
  adFormSlider.disabled = 'disabled';
  //Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
  mapFiltersContainer.classList.add('map__filters--disabled');

  mapFiltersList.forEach( (mapFilter) => {
    mapFilter.disabled = 'disabled';
  });
};

const enablePage = () => {
  //Форма заполнения информации об объявлении .ad-form не содержит класс ad-form--disabled;
  adFormContainer.classList.remove('ad-form--disabled');
  //Все интерактивные элементы формы .ad-form не содержат атрибут disabled
  adFormItemsList.forEach( (adFormItem) => {
    adFormItem.disabled = '';
  });
  //Слайдер должен быть разблокирован;
  adFormSlider.disabled = '';
  //Форма с фильтрами .map__filters разблокирована так же, как и форма .ad-form. Интерактивные элементы формы с фильтрами не содержат атрибуты disabled.
  mapFiltersContainer.classList.remove('map__filters--disabled');
  mapFiltersList.forEach( (mapFilter) => {
    mapFilter.disabled = '';
  });
};

enablePage(); //privet, ugadai zachem menya vizvali? (c)enablePage
export {disablePage};
