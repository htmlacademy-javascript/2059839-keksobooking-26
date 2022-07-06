import {enablePage} from './form.js';
import {
  adAddressElement,
  adFormValidationSetting,
  prepareAddressValue
} from './form-validation.js';
import {createPopup} from './popup.js';

const mapContainerElement = document.querySelector( '#map-canvas');
const buttonResetElement = document.querySelector( '.ad-form__reset');

const mapStartPosition = {
  lat:adFormValidationSetting.address.startPosition.lat,
  lng:adFormValidationSetting.address.startPosition.lng,
  scale:12
};
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const map = L.map(mapContainerElement)
  .on('load', () => {
    enablePage();
  })
  .setView(
    {
      lat:mapStartPosition.lat,
      lng:mapStartPosition.lng,
    },
    mapStartPosition.scale
  );

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarker = L.marker(
  {
    lat:mapStartPosition.lat,
    lng:mapStartPosition.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (element) => {
  const marker = L.marker(
    {
      lat: element.location.lat,
      lng: element.location.lng
    },
    {
      icon: pinIcon
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createPopup(element));

  return marker;
};

const setDefaultMapPosition = () => {
  map.closePopup();
  map.setView(
    {
      lat:mapStartPosition.lat,
      lng:mapStartPosition.lng,
    },
    mapStartPosition.scale
  );

  mainMarker.setLatLng(
    {
      lat:mapStartPosition.lat,
      lng:mapStartPosition.lng,
    }
  );
};
// функция на создание точек объявлений на карте и отрисовку слоя с ними
const fillMapLayer = (array) => {
  array.forEach((element) => createMarker(element));
};

mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  adAddressElement.value = prepareAddressValue(evt.target.getLatLng(), adFormValidationSetting.address.coordinateNumLength);
});
//fillMapLayer(adExamples);
buttonResetElement.addEventListener('click', setDefaultMapPosition);

export {
  fillMapLayer
};
