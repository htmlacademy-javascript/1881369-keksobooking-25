import {numDecline} from'./util.js';

const ADS_TYPE_CAPTIONS = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');

const createPhotoElements = (photoArray, parentElement) => {
  photoArray.forEach((photo) => {
    const photoTemplate = parentElement.children[0].cloneNode(true);
    photoTemplate.src = photo;
    parentElement.append(photoTemplate);
  });
  parentElement.children[0].remove();
};

const createFeatureElements = (list, featuresArray, nameClass) => {
  list.forEach((listItem) => {
    const isExists = featuresArray.some((userFeature) =>
      listItem.classList.contains(`${nameClass}${userFeature}`),
    );
    if (!isExists) {listItem.remove();}
  });
};

const checkAvailableData = (data, element) => {
  if (!data) {
    element.hidden = true;
  }
};

const createPopup = ({offer, author}) => {
  const adElement = similarAdTemplate.cloneNode(true);

  const adTitle = adElement.querySelector('.popup__title');
  const adAddress = adElement.querySelector('.popup__text--address');
  const adPrice = adElement.querySelector('.popup__text--price');
  const adType = adElement.querySelector('.popup__type');
  const adCapacity = adElement.querySelector('.popup__text--capacity');
  const adTime = adElement.querySelector('.popup__text--time');
  const adDescription = adElement.querySelector('.popup__description');
  const adAvatar = adElement.querySelector('.popup__avatar');
  const adFeatures = adElement.querySelectorAll('.popup__features');
  const featuresList = adElement.querySelectorAll('.popup__feature');
  const adPhotos = adElement.querySelector('.popup__photos');

  adTitle.textContent = offer.title;
  adAddress.textContent = offer.address;
  adPrice.textContent = `${offer.price} ₽/ночь`;
  adType.textContent = ADS_TYPE_CAPTIONS[offer.type];
  adCapacity.textContent = `${offer.rooms} ${numDecline(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${offer.guests} ${numDecline(offer.guests, 'гостя', 'гостей', 'гостей')}`;
  adTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adDescription.textContent = offer.description;
  adAvatar.src = author.avatar;

  checkAvailableData(offer.title, adTitle);
  checkAvailableData(offer.address, adAddress);
  checkAvailableData(offer.price, adPrice);
  checkAvailableData(offer.type, adType);
  checkAvailableData(offer.rooms, adCapacity);
  checkAvailableData(offer.checkin, adTime);
  checkAvailableData(offer.description, adDescription);
  checkAvailableData(author.avatar, adAvatar);
  checkAvailableData(offer.features, adFeatures);
  checkAvailableData(offer.photos, adPhotos);

  createFeatureElements(featuresList, offer.features, 'popup__feature--');
  createPhotoElements(offer.photos, adPhotos);

  return adElement;
};

export {createPopup};

