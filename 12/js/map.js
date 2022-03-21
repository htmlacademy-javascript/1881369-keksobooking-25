
import {toggleFormDisabled} from './form-switcher.js';
import {createAds} from './data.js';
import {createPopup} from './similar-ads.js';

const MAIN_LOCATION = {
  lat: 35.675178,
  lng: 139.748876,
};

const mainPinLocation = document.querySelector('#address');

const COUNT_OF_ADS = 10;

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

// Добавление главной метки на карту
const loadMainPin = (map) => {
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
};

// Добавление меток похожих объявлений на карту
const loadSimilarPins = (map) => {
  const overPoints = createAds(COUNT_OF_ADS);
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

  overPoints.forEach((ad) => {
    createMarker(ad);
  });
  //markerGroup.clearLayers();
};

// Инициализация карты
const loadMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      toggleFormDisabled(false);
    })
    .setView(MAIN_LOCATION, 13);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  loadMainPin(map);
  loadSimilarPins(map);
};

export {loadMap};
