import {openSuccessSendMessage, openErrorSendMessage} from './errors.js';
import {showAlert} from './util.js';

const getData = (onSuccess, count) => () => fetch(
  'https://25.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

  })
  .then((data) => {
    data.slice(0, count).forEach((ad) => {
      onSuccess(ad);
    });
  })
  .catch(() => {
    showAlert('Не удалось получить данные с сервера :(');
  });


const sendData = (body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        //onSuccess();
        openSuccessSendMessage();
      } else {
        openErrorSendMessage();
      }
    })
    .catch(() => {
      openErrorSendMessage();
    });
};

export {getData ,sendData};
