import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray} from './util.js';

const ADS_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECK_IN = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

const ADS_TITLES = [
  'Просторное помещение',
  'Тихое, уютное место для двоих',
  'Светлое, просторное место',
  'Всё по фен шую, как вы ждали',
  'Вам захочется приехать сюда ещё раз'
];

const ADS_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const ADS_DISCRIPTIONS = [
  'Все окна на север',
  'Тихие соседи',
  'Южная сторона',
  'Панорамные окна'
];

const ADS_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createAutor = (avatarNumber) => ({
  avatar: `img/avatars/user${avatarNumber}.png`,
});

const createOffer = (lat, lng) => ({
  title: getRandomArrayElement(ADS_TITLES),
  address: `${lat} ${lng}`,
  price: getRandomPositiveInteger(1000, 5000),
  type: getRandomArrayElement(ADS_TYPES),
  rooms: getRandomPositiveInteger(1, 5),
  guests: getRandomPositiveInteger(1, 10),
  checkin: getRandomArrayElement(CHECK_IN),
  checkout: getRandomArrayElement(CHECK_OUT),
  features: getRandomArray(ADS_FEATURES),
  description: getRandomArrayElement(ADS_DISCRIPTIONS),
  photos: getRandomArray(ADS_PHOTOS),
});

const createLocation = (lat, lng) => ({
  lat,
  lng,
});

const createAd = (avatarNumber) => {
  const lat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const lng = getRandomPositiveFloat(139.70000, 139.80000, 5);
  return {
    author: createAutor(avatarNumber),
    location: createLocation(lat, lng),
    offer: createOffer(lat, lng),
  };
};

const createAds = (count) => {
  const ads = Array.from({length: count} , (ad, i) => {
    const avatarNumber = (i + 1 < 10) ? `0${i + 1}` : `${i + 1}`;
    ad = createAd(avatarNumber);
    return ad;
  });
  return ads;
};

export {createAds};
