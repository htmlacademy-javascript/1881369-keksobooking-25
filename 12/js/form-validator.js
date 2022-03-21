import {adTypesToPrice} from'./data.js';

const form = document.querySelector('.ad-form');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const sliderPrice = document.querySelector('.ad-form__slider');
const adTimeInOut = document.querySelector('.ad-form__element--time');

const MAX_PRICE_FOR_NIGHT = 100000;

const ROOMS_GUESTS_OPTIONS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

// Валидация цены и типа жилья
const validateAdPrice = (value) => value >= adTypesToPrice[adType.value] && value <= MAX_PRICE_FOR_NIGHT;
const getAdTypeErrorMessage = () => `Минимальная цена за ночь: ${adTypesToPrice[adType.value]}`;

pristine.addValidator(
  adPrice,
  validateAdPrice,
  getAdTypeErrorMessage
);

const onAdTypeChange = function () {
  adPrice.min = adTypesToPrice[this.value];
  adPrice.placeholder =  adTypesToPrice[this.value];
  sliderPrice.noUiSlider.updateOptions({
    range: {
      min: adTypesToPrice[this.value],
      max: MAX_PRICE_FOR_NIGHT,
    }
  });
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

// Слайдер цены
noUiSlider.create(sliderPrice, {
  range: {
    min: adTypesToPrice[adType.value],
    max: MAX_PRICE_FOR_NIGHT,
  },
  start: adTypesToPrice[adType.value],
  step: 100,
});

sliderPrice.noUiSlider.on('slide', () => {
  adPrice.value = sliderPrice.noUiSlider.get();
  pristine.validate(adPrice);
});

adPrice.addEventListener('change', () => {
  sliderPrice.noUiSlider.set(adPrice.value);
});

//export {validateAdForm};
