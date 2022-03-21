import {loadMap} from './map.js';
import {toggleFormDisabled} from './form-switcher.js';
import './form-validator.js';

toggleFormDisabled(true);
setTimeout(loadMap, 1000);


//document.querySelector('#map-canvas').append(createPopup(similarAds[0]));

