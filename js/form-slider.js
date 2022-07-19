import {
  adFormValidationSetting,
} from './form-validation.js';

const adFormSliderElement = document.querySelector('.ad-form__slider');
const adTypeElement = document.querySelector( '[name="type"]');
const adPriceElement = document.querySelector( '[name="price"]');

const getSliderStartPosition = () => {
  if (adPriceElement.value === undefined) {
    return adFormValidationSetting.price.min[adTypeElement.value];
  }
  return Number(adPriceElement.value);
};

const setSlider = () => {
  noUiSlider.create(
    adFormSliderElement,
    {
      range:{
        min: 0,
        max: adFormValidationSetting.price.max
      },
      start: getSliderStartPosition(),
      step: 1,
      connect: 'lower',
      format:{
        to: (value) => value.toFixed(0),
        from: (value) => Number(value)
      },
    }
  );
};

const setSliderPosition = () => adFormSliderElement.noUiSlider.set(adPriceElement.value);
const updateSliderPosition = () => setSliderPosition( getSliderStartPosition() );

const onSliderChange = (validator) => {
  adPriceElement.value = adFormSliderElement.noUiSlider.get();
  validator(adPriceElement);
};

const setSliderChangeListener = (validator) => adFormSliderElement.noUiSlider.on('change', () => onSliderChange(validator));

export {
  setSlider,
  updateSliderPosition,
  setSliderPosition,
  setSliderChangeListener
};
