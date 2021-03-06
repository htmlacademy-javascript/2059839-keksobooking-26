import {
  setAddressValue
} from './form.js';

import {createPopup} from './popup.js';

const mapContainerElement = document.querySelector( '#map-canvas');
//настройки карты
const mapStartPosition = {
  lat:35.68173,
  lng:139.75398,
  coordinateNumLength:5,
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
const map = L.map(mapContainerElement);
const tile = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);
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
const markerGroup = L.layerGroup();
const defaultMarkerGroup = L.layerGroup();

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
//функция на заполнение карты
const fillMap = () => {
  tile.addTo(map);
  mainMarker.addTo(map);
  markerGroup.addTo(map);
};

// функция на создание точек объявлений на карте и отрисовку слоя с ними
const fillMapLayer = (array) => array.forEach((element) => createMarker(element));

const clearMapLayer = () => markerGroup.clearLayers();

const saveDefaultMapLayer = () => markerGroup.eachLayer( (layer) => layer.addTo(defaultMarkerGroup) );

const setDefaultMapLayer = () => defaultMarkerGroup.eachLayer( (layer) => layer.addTo(markerGroup) );

const setMapView = () => {
  map.setView(
    {
      lat:mapStartPosition.lat,
      lng:mapStartPosition.lng,
    },
    mapStartPosition.scale
  );

};

//функция на установку дефолтной позиции карты
const setDefaultMapPosition = () => {
  map.closePopup();
  setMapView();

  mainMarker.setLatLng(
    {
      lat:mapStartPosition.lat,
      lng:mapStartPosition.lng,
    }
  );
};

const setDefaultAddressValue = () => setAddressValue(mainMarker.getLatLng(), mapStartPosition.coordinateNumLength);

const onMapLoad = (pageState, dataAction, onSuccessDataAction, onFailedDataAction) => {
  pageState();
  fillMap();
  setDefaultAddressValue();
  dataAction(
    //отрисовываем метки при успешном получении данных и активируем фильтры
    (ads) => {
      onSuccessDataAction(ads);
    },
    () => {
      onFailedDataAction();
    }
  );
};

const setMapLoadListener = (pageState, dataAction, onSuccessDataAction, onFailedDataAction) => {
  map.on('load', () => onMapLoad(pageState, dataAction, onSuccessDataAction, onFailedDataAction));
  setMapView();
};

const setMainMarkerMoveendListener = (onMoveEndAction) => mainMarker.on('moveend', (evt) => onMoveEndAction(evt.target.getLatLng(), mapStartPosition.coordinateNumLength));

export {
  setDefaultMapPosition,
  setDefaultAddressValue,
  setDefaultMapLayer,
  setMapLoadListener,
  setMainMarkerMoveendListener,
  fillMapLayer,
  clearMapLayer,
  saveDefaultMapLayer
};
