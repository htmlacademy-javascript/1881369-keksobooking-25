import {createPopup} from './similar-ads.js';
//import {toggleFormDisabled} from './form.js';
import {createAds} from './data.js';
import './form-validator.js';

const COUNT_OF_ADS = 10;
const similarAds = createAds(COUNT_OF_ADS);

document.querySelector('#map-canvas').append(createPopup(similarAds[0]));
