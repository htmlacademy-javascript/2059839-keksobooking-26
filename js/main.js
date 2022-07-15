import {
  showSuccessMessagePopup,
  showErrorMessagePopup
} from './popup.js';

import {
  disableUserForm,
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
  setMainMarkerMoveendListener,
  fillMapLayer,
  clearMapLayer,
  saveDefaultMapLayer,
  setDefaultMapLayer
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

import {
  showAlert,
  debounce
} from './util.js';
import {setMapFiltersListener} from './filter.js';

const SIMILLAR_AD_COUNT = 10;
const ADS_RENDER_DELAY = 500;

disableUserForm();
disableMapFilter();

// КАРТА
//
// указываем состояние страницы после успешной загрузки карты и похожих объявлений
setMapLoadState(
  // pageState
  () => {
    enableUserForm();
    // устанавливаем обработчик на главный пин карты и указываем какое действие при его перемещении делать
    setMainMarkerMoveendListener(setAddressValue);
  },
  // dataAction
  getData,
  // onSuccessDataAction
  (ads) => {
    fillMapLayer(
      ads.slice(),
      SIMILLAR_AD_COUNT
    );
    saveDefaultMapLayer();
    enableMapFilter();
    setMapFiltersListener(
      // actions
      (filteredAds) => {
        clearMapLayer();
        debounce(
          fillMapLayer(filteredAds, SIMILLAR_AD_COUNT),
          ADS_RENDER_DELAY
        );
      },
      ads, // array
      SIMILLAR_AD_COUNT // outputLength
    );
  },
  // onFailedDataAction
  () => {
    showAlert('Не удалось загрузить похожие объявления');
  }
);

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
    clearMapLayer();
    setPriceRelativeAttribute();
    setDefaultMapPosition();
    setDefaultAddressValue();
    setDefaultMapLayer();
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
    clearMapLayer();
    setPriceRelativeAttribute();
    setDefaultMapPosition();
    setDefaultAddressValue();
    setDefaultMapLayer();
    updateSliderSetting();
  }
);
