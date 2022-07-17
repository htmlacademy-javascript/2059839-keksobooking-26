import {cutNumber} from './util.js';

const adFormContainerElement = document.querySelector('.ad-form');
const mapFiltersContainerElement = document.querySelector('.map__filters');
const adFormChildrenElement = Array.from(adFormContainerElement.children);
const adAddressElement = adFormContainerElement.querySelector( '[name="address"]');

const adFormSliderElement = adFormContainerElement.querySelector('.ad-form__slider');

const mapFilterContainerElement = document.querySelector('.map__filters');
const mapFilterChildrenElement = Array.from(mapFilterContainerElement.children);

const buttonSubmitElement = adFormContainerElement.querySelector( '.ad-form__submit');
const buttonResetElement = adFormContainerElement.querySelector( '.ad-form__reset');


const disableMapFilter = () => {
  mapFilterContainerElement.classList.add('map__filters--disabled');

  for (let i = 0; i < mapFilterChildrenElement.length; i++) {
    mapFilterChildrenElement[i].disabled = true;
  }
};

const enableMapFilter = () => {
  mapFilterContainerElement.classList.remove('map__filters--disabled');

  for (let i = 0; i < mapFilterChildrenElement.length; i++) {
    mapFilterChildrenElement[i].disabled = false;
  }
};

const disableUserForm = () => {
  adFormContainerElement.classList.add('ad-form--disabled');

  for (let i = 0; i < adFormChildrenElement.length; i++) {
    adFormChildrenElement[i].disabled = true;
  }

  adFormSliderElement.disabled = true;
};

const enableUserForm = () => {
  adFormContainerElement.classList.remove('ad-form--disabled');

  for (let i = 0; i < adFormChildrenElement.length; i++) {
    adFormChildrenElement[i].disabled = false;
  }
  adFormSliderElement.disabled = false;
};

const setAddressValue = (point, coordinateLength) => {
  adAddressElement.value = `${cutNumber(point.lat, coordinateLength)}, ${cutNumber(point.lng, coordinateLength)}`;
};

const blockSubmitButton = () => {
  buttonSubmitElement.disabled = true;
  buttonSubmitElement.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  buttonSubmitElement.disabled = false;
  buttonSubmitElement.textContent = 'Опубликовать';
};

const onUserFormSubmit = (evt, validator, dataAction, onValidFormAction, onInvalidFormAction) => {
  evt.preventDefault();
  if (validator()) {
    blockSubmitButton();
    dataAction(
      () => {
        adFormContainerElement.reset();
        mapFiltersContainerElement.reset();
        onValidFormAction();
        unblockSubmitButton();
      },
      () => {
        onInvalidFormAction();
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  }
};

const onUserFormReset = (evt, onFormResetActions) => {
  evt.preventDefault();
  adFormContainerElement.reset();
  mapFiltersContainerElement.reset();
  onFormResetActions();
};

const setUserFormSubmit = (validator, dataAction, onValidFormAction, onInvalidFormAction) => adFormContainerElement.addEventListener('submit', (evt) => onUserFormSubmit(evt, validator, dataAction, onValidFormAction, onInvalidFormAction));

const setButtonResetListener = (onFormResetActions) => buttonResetElement.addEventListener('click', (evt) => onUserFormReset(evt, onFormResetActions));

export {
  enableUserForm,
  disableUserForm,
  enableMapFilter,
  disableMapFilter,
  setAddressValue,
  setUserFormSubmit,
  setButtonResetListener
};
