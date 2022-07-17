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
  resetValidationErrors,
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
import {
  setAvatarUploadListener,
  setPhotoUploadListener,
  setDefaultAvatar,
  removePhotos
} from './file.js';

const SIMILLAR_AD_COUNT = 10;
const ADS_RENDER_DELAY = 500;
const ALERT_SHOW_TIME = 10000;
const similarAdsLoadingErrorMessage = 'Не удалось загрузить похожие объявления';

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
  // onSuccessDataLoad
  (ads) => {
    fillMapLayer(ads.slice(0,SIMILLAR_AD_COUNT));
    saveDefaultMapLayer();
    enableMapFilter();
    setMapFiltersListener(
      // actions
      (filteredAds) => {
        clearMapLayer();
        filteredAds.splice(SIMILLAR_AD_COUNT);
        debounce(
          fillMapLayer(filteredAds),
          ADS_RENDER_DELAY
        );
      },
      ads
    );
  },
  // onFailedDataLoad
  () => {
    showAlert(similarAdsLoadingErrorMessage, ALERT_SHOW_TIME);
  }
);

// ФОРМА
//
// устанавливаем слайдер
setSlider();
// вешаем на него обработчик + добавляем валидатор
setSliderChangeListener(validateUserForm);

// навешиваем обработчики c валидацией на инпуты форм
setAvatarUploadListener();
setPhotoUploadListener();
setAdRoomElementListener();
setAdTypeElementListener();
setAdPriceElementListener(setSliderPosition);
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
    setDefaultAvatar();
    removePhotos();
    setPriceRelativeAttribute();
    setDefaultMapPosition();
    setDefaultAddressValue();
    setDefaultMapLayer();
    updateSliderSetting();
    showSuccessMessagePopup();
  },
  //onInvalidFormAction
  showErrorMessagePopup
);

//указываем, что делать при сбросе формы
setButtonResetListener(
  //onFormResetActions
  () => {
    resetValidationErrors();
    clearMapLayer();
    setDefaultAvatar();
    removePhotos();
    setPriceRelativeAttribute();
    setDefaultMapPosition();
    setDefaultAddressValue();
    setDefaultMapLayer();
    updateSliderSetting();
  }
);
