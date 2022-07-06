import './popup.js';
import {
  enablePage,
  disablePage,
  disableMapFilter
} from './form.js';
import {setUserFormSubmit} from './form-validation.js';
import {showAlert} from './util.js';
import {fillMapLayer} from './map.js';
import './form-slider.js';
import {getData} from './api.js';

const SIMILLAR_AD_COUNT = 10;

getData(
  //отрисовываем метки при успешном получении данных
  (ads) => fillMapLayer( ads.slice(0,SIMILLAR_AD_COUNT) ),
  //блочи фильтры карты и показываем всплывашку с ошибкой
  (elem) => {
    showAlert(elem);
    disableMapFilter();
  }
);

setUserFormSubmit('Форма отправлена успешно');
