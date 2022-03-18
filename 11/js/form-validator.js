import {AD_TYPES_TO_PRICE} from'./data.js';

const form = document.querySelector('.ad-form');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const adTimeInOut = document.querySelector('.ad-form__element--time');

const ROOMS_GUESTS_OPTIONS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const validateAdForm = () => {
  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__item--invalid',
    successClass: 'ad-form__item--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error',
  });

  // Валидация цены и типа жилья
  const validateAdPrice = (value) => value >= AD_TYPES_TO_PRICE[adType.value] && value <= 100000;
  const getAdTypeErrorMessage = () => `Минимальная цена за ночь: ${AD_TYPES_TO_PRICE[adType.value]}`;

  pristine.addValidator(
    adPrice,
    validateAdPrice,
    getAdTypeErrorMessage
  );

  const onAdTypeChange = function () {
    adPrice.min = AD_TYPES_TO_PRICE[this.value];
    adPrice.placeholder =  AD_TYPES_TO_PRICE[this.value];
    pristine.validate(adPrice);
  };

  adType.addEventListener('change', onAdTypeChange);

  // Валидация количества комнат и гостей
  const validateDelivery = () => ROOMS_GUESTS_OPTIONS[roomNumber.value].includes(capacity.value);
  const getDeliveryErrorMessage = () => 'Выберите другое кол-во гостей :)';

  pristine.addValidator(
    capacity,
    validateDelivery,
    getDeliveryErrorMessage
  );

  roomNumber.addEventListener('change', () => {
    pristine.validate(capacity);
  });

  // Валидация времени заезда и выезда
  const onTimeInOutChange = (evt) => {
    timeIn.value = timeOut.value = evt.target.value;
  };

  adTimeInOut.addEventListener('change', onTimeInOutChange);

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (isValid) {
      //alert('Можно отправлять');
    } else {
      evt.preventDefault();
      //alert('Форма невалидна');
    }
  });
};

export {validateAdForm};
