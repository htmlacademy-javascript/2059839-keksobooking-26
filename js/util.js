const cutNumber = (num, numLength) => parseFloat( num.toFixed(numLength) );

const alertMessageSetting = {
  style:{
    zIndex: 100,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    padding: '10px 3px',
    fontSize: '30px',
    textAlign: 'center',
    backgroundColor: 'red'
  }
};

const showAlert = (message, showTime) => {
  const alertContainerElement = document.createElement('div');
  alertContainerElement.style.zIndex = alertMessageSetting.style.zIndex;
  alertContainerElement.style.position = alertMessageSetting.style.position;
  alertContainerElement.style.left = alertMessageSetting.style.left;
  alertContainerElement.style.top = alertMessageSetting.style.top;
  alertContainerElement.style.right = alertMessageSetting.style.right;
  alertContainerElement.style.padding = alertMessageSetting.style.padding;
  alertContainerElement.style.fontSize = alertMessageSetting.style.fontSize;
  alertContainerElement.style.textAlign = alertMessageSetting.style.fontSize;
  alertContainerElement.style.backgroundColor = alertMessageSetting.style.backgroundColor;

  alertContainerElement.textContent = message;

  document.body.appendChild(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, showTime);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscPressed = (evt) => evt.key === 'Escape';

export {
  cutNumber,
  showAlert,
  isEscPressed,
  debounce
};
