import {adFormSliderElement} from './form.js';
import {
  adFormValidationSetting,
  adPriceElement,
  adTypeElement,
  onPriceChange
} from './form-validation.js';

//функция на установку стартового валидного значения цены
const setValidStartPrice = () => {
  adPriceElement.value = ( adPriceElement.value <= adFormValidationSetting.price.min[adTypeElement.value] ) ?
    adPriceElement.value = adFormValidationSetting.price.min[adTypeElement.value] :
    adPriceElement.value;
};

noUiSlider.create(adFormSliderElement, {
  range:{
    min: Number(adFormValidationSetting.price.min[adTypeElement.value]),
    max: Number(adFormValidationSetting.price.max)
  },
  start: Number(adFormValidationSetting.price.min[adTypeElement.value]),
  step: 1,
  connect: 'lower',
  format:{
    to: (value) => value.toFixed(0),
    from: (value) => Number(value)
  },
});

//апдейт сеттингов слайдера
const updateSliderSetting = () => {
  adFormSliderElement.noUiSlider.updateOptions(
    {
      range:{
        min: Number(adFormValidationSetting.price.min[adTypeElement.value]),
        max: Number(adFormValidationSetting.price.max)
      },
      start: setValidStartPrice()
    }
  );
};

adFormSliderElement.noUiSlider.on('update', () => {
  adPriceElement.value = adFormSliderElement.noUiSlider.get();
  onPriceChange();
});

adTypeElement.addEventListener('change',updateSliderSetting);

adPriceElement.addEventListener('change',() => {
  adFormSliderElement.noUiSlider.set(adPriceElement.value);
});
