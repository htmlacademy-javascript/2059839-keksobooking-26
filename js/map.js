import {enablePage} from './form.js';
const mapContainerElement = document.querySelector( '#map-canvas');
const mapStartPosition = {
  lat:35.68173,
  lng:139.75398,
  scale:10
};

const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
    console.log('Карта инициализирована');
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

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [144, 144],
  iconAnchor: [72, 144],
});

const marker = L.marker(
  {
    lat:mapStartPosition.lat,
    lng:mapStartPosition.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  console.log(evt.target);
  console.log(evt.target.getLatLng());
});

//неглавные метки
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

