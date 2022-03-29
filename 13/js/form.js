//import './form-validator.js';
import {pristine} from'./form-validator.js';
import './slider.js';
import {MAIN_LOCATION, getLocationToString, resetMainPin} from './map.js';
import {sendData} from './api.js';


const formAd = document.querySelector('.ad-form');
const mainPinLocation = document.querySelector('#address');
const resetFormButton = document.querySelector('.ad-form__reset');
const sendButton = document.querySelector('.ad-form__submit');

const resetForm = (evt) => {
  evt.preventDefault();
  pristine.reset();
  formAd.reset();
  mainPinLocation.value = getLocationToString(MAIN_LOCATION, 5);
  resetMainPin();
};

resetFormButton.addEventListener('click', resetForm);

formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    sendData(new FormData(evt.target));
    sendButton.disabled = true;
    resetForm(evt);
  }
});
