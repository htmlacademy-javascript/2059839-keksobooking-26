import {
  adFormValidationSetting,
} from './form-validation.js';

const adFormSliderElement = document.querySelector('.ad-form').querySelector('.ad-form__slider');
const adTypeElement = document.querySelector('.ad-form').querySelector( '[name="type"]');
const adPriceElement = document.querySelector('.ad-form').querySelector( '[name="price"]');

const getSliderStartPosition = () => {
  if (adPriceElement.value === undefined) {
    return Number(adFormValidationSetting.price.min[adTypeElement.value]);
  }
  return Number(adPriceElement.value);
};

const setSlider = () => {
  noUiSlider.create(
    adFormSliderElement,
    {
      range:{
        min: 0,
        max: Number(adFormValidationSetting.price.max)
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

//апдейт сеттингов слайдера
const updateSliderSetting = () => {
  adFormSliderElement.noUiSlider.updateOptions(
    {
      range:{
        min: 0,
        max: Number(adFormValidationSetting.price.max)
      },
      start: getSliderStartPosition()
    }
  );
};

const setSliderPosition = () => adFormSliderElement.noUiSlider.set(adPriceElement.value);

const setSliderChangeListener = (validator) => {
  adFormSliderElement.noUiSlider.on('change', () => {
    adPriceElement.value = adFormSliderElement.noUiSlider.get();
    validator(adPriceElement);
  });
};

export {
  setSlider,
  updateSliderSetting,
  setSliderPosition,
  setSliderChangeListener
};
