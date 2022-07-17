const serverAddressForGettingData = 'https://26.javascript.pages.academy/keksobooking/data';
const serverAddressForSendingData = 'https://26.javascript.pages.academy/keksobooking';
const similarAdsLoadingErrorMessage = 'Не удалось загрузить похожие объявления';

const getData = (onSuccess, onFail) => {
  fetch(serverAddressForGettingData)
    .then( (response) => {
      if (!response.ok) {
        throw new Error(similarAdsLoadingErrorMessage);
      }
      return response.json();
    })
    .then( (ads) => onSuccess(ads) )
    .catch( (err) => onFail(err.message) );
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    serverAddressForSendingData,
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if (!response.ok) {
        onFail();
      } else {
        onSuccess();
      }
    })
    .catch( () => onFail() );
};

export {
  getData,
  sendData,
  similarAdsLoadingErrorMessage
};
