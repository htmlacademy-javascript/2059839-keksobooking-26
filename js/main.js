import {
  showSuccessMessagePopup,
  showErrorMessagePopup
} from './popup.js';

import {
  enableUserForm,
  enableMapFilter,
  disableMapFilter,
  setUserFormSubmit,
  setButtonResetListener,
  setAddressValue
} from './form.js';

import {
  setPriceRelativeAttribute,
  validateUserForm,
  setAdRoomElementListener,
  setAdTypeElementListener,
  setAdTimeOutElementListener,
  setAdPriceElementListener,
  setAdTimeInElementListener
} from './form-validation.js';

import {
  setDefaultMapPosition,
  setDefaultAddressValue,
  setMapLoadState,
  setMainMarkerMoveendListener
} from './map.js';

import {
  setSlider,
  updateSliderSetting,
  setSliderPosition,
  setSliderChangeListener
} from './form-slider.js';

import {
  getData,
  sendData
} from './api.js';

import {showAlert} from './util.js';

// КАРТА
//
// указываем состояние страницы после загрузки карты и похожих объявлений
setMapLoadState(
  // pageState
  () => {
    disableMapFilter(); //пока оставляем тут, в будущем переместить в блок с логикой переводы страницы в неактивное состояние при загрузке
    enableUserForm();
  },
  // dataAction
  getData,
  // onSuccessDataAction
  enableMapFilter,
  // onFailedDataAction
  () => {
    showAlert('Не удалось загрузить похожие объявления');
  }
);
// устанавливаем обработчик на главный пин карты и указываем какое действие при его перемещении делать
setMainMarkerMoveendListener(setAddressValue);


// ФОРМА
//
// устанавливаем слайдер
setSlider();
// вешаем на него обработчик + добавляем валидатор
setSliderChangeListener(validateUserForm);

// навешиваем обработчики c валидацией на инпуты форм
setAdRoomElementListener();
setAdTypeElementListener();
setAdPriceElementListener(
  () => {
    setSliderPosition();
  }
);
setAdTimeOutElementListener();
setAdTimeInElementListener();

//указываем что делать при отправке формы
setUserFormSubmit(
  //validator
  validateUserForm,
  // dataAction
  sendData,
  //onValidFormAction
  () => {
    setPriceRelativeAttribute();
    setDefaultMapPosition();
    setDefaultAddressValue();
    updateSliderSetting();
    showSuccessMessagePopup();
  },
  //onInvalidFormAction
  () => {
    showErrorMessagePopup();
  }
);
//указываем, что делать при сбросе формы
setButtonResetListener(
  //onFormReset
  () => {
    setPriceRelativeAttribute();
    setDefaultMapPosition();
    setDefaultAddressValue();
    updateSliderSetting();
  }
);
