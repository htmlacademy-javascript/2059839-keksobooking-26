import {createAdExamples} from './data.js';
import {createPopup} from './popup.js';
import {
  adFormContainerElement,
  roomNumberElement,
  capacityElement,
  setTitleValidationSettings,
  setPriceValidationSettings,
  validateRoomCapacity,
  getCapacityErrorMessage
} from './form.js';

const adExamples = createAdExamples();
const popupPlace = document.querySelector('#map-canvas'); //сюда надо отрисовать 1 попап

//Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.
popupPlace.appendChild(createPopup(adExamples[0]));

setTitleValidationSettings();
setPriceValidationSettings();

//конфиги для валидации
const pristine = new Pristine(adFormContainerElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
},true);

const onFieldChange = () => {
  pristine.validate(capacityElement);
};

pristine.addValidator(capacityElement, validateRoomCapacity, getCapacityErrorMessage);

roomNumberElement.addEventListener('change',onFieldChange);

adFormContainerElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
