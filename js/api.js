const serverAddressForGettingData = 'https://26.javascript.pages.academy/keksobooking/data';
const serverAddressForSendingData = 'https://26.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(serverAddressForGettingData)
    .then( (response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить похожие объявления');
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
      console.log('response');
      console.log(response);
      console.log(response.ok);
      if (!response.ok) {
        throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
      }
      onSuccess();
    })
    .catch( (err) => onFail(err.message) );
};

//const test = getData();
//console.log(test);
export {
  getData,
  sendData
};
