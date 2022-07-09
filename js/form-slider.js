import {
  adFormContainerElement,
  adFormSliderElement
} from './form.js';
import {
  adFormValidationSetting,
  adPriceElement,
  buttonResetElement,
  adTypeElement,
  onPriceChange
} from './form-validation.js';

noUiSlider.create(adFormSliderElement, {
  range:{
    min: 0,
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

adFormSliderElement.noUiSlider.on('change', () => {
  adPriceElement.value = adFormSliderElement.noUiSlider.get();
  onPriceChange();
});

adPriceElement.addEventListener('change',() => {
  adFormSliderElement.noUiSlider.set(adPriceElement.value);
});

const setSliderRelativetStartPosition = () => {
  if (adTypeElement.value === undefined) {
    return adFormValidationSetting.price.min[adTypeElement.value];
  }
  return adTypeElement.value;
};

//апдейт сеттингов слайдера
const updateSliderSetting = () => {
  adFormSliderElement.noUiSlider.updateOptions(
    {
      range:{
        min: 0,
        max: Number(adFormValidationSetting.price.max)
      },
      start: setSliderRelativetStartPosition()
    }
  );
};

//поправить, при неуспешной отправке данных значения в форме сохраняются, а слайдер сбрасыватся до значения плейсхолдера типа
adFormContainerElement.addEventListener('submit', updateSliderSetting);
buttonResetElement.addEventListener('click', updateSliderSetting);
