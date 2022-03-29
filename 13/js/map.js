//import {createAds} from './data.js';
import {createPopup} from './similar-ads.js';
import {getData} from './api.js';
import {toggleFormDisabled} from './form-switcher.js';

//const resetFormButton = document.querySelector('.ad-form__reset');
const COUNT_OF_ADS = 10;

const MAIN_LOCATION = {
  lat: 35.675178,
  lng: 139.748876,
};

const mainPinLocation = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const similarPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const getLocationToString = (obj, number) => {
  let {lat, lng} = obj;
  lat = Number(lat.toFixed(number));
  lng = Number(lng.toFixed(number));
  return `${lat}, ${lng}`;
};

toggleFormDisabled(true);

const map = L.map('map-canvas')
  .on('load', () => {
    toggleFormDisabled(false); // открытие - показ формы
  })
  .setView(MAIN_LOCATION, 13);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавление главной метки на карту
const mainPinMarker = L.marker(
  MAIN_LOCATION,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);
mainPinLocation.value = getLocationToString(mainPinMarker.getLatLng(), 5);

mainPinMarker.on('moveend', (evt) => {
  mainPinLocation.value = getLocationToString(evt.target.getLatLng(), 5);
});


const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: similarPinIcon,
    }
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createPopup(ad));
};

const getAds = getData(createMarker, COUNT_OF_ADS);
getAds();

const resetMainPin = () => {
  mainPinMarker.setLatLng(MAIN_LOCATION);
  map.setView(MAIN_LOCATION, 13);
  map.closePopup();
};

//loadSimilarPins(map);
//};

export {resetMainPin, MAIN_LOCATION, getLocationToString, mainPinLocation};
