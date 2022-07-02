import {enablePage} from './form.js';
import {adAddressElement} from './form-validation';

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
  adAddressElement.value = evt.target.getLatLng();

});

//неглавные метки
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

/*
//возврат пина и карты на стартовую позицию после нажатия на кнопку сброса
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 59.96831,
    lng: 30.31748,
  });

  map.setView({
    lat: 59.96831,
    lng: 30.31748,
  }, 16);
});

//удаление метки
mainPinMarker.remove();

//создаем метки и добавляем их на карту, points - массив объектов
points.forEach(({lat, lng}) => {
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon
    }
  );

  marker
    .addTo(map); //добавляем на карту
    .bindPopup(); //привязываем балун, внутри передаем функцию, возвращающую заполненный дом-элемент объявления
});
//создаем слой для меток
const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng} = point;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup) //добавляем не на карту, а на слой
    .bindPopup(createCustomPopup(point));
};


const markers = points.map((point) => {
  return createMarker(point);
});
//удаление маркеров
markers.forEach((marker) => {
  marker.remove();
});
//удаление маркеров через очистку слоя
markerGroup.clearLayers();

//по кнопке скрываем текущие метки и отрисовываем новые - пригодится для фильтров
nextButton.addEventListener('click', () => {
  markerGroup.clearLayers();
  points.slice(points.length / 2).forEach((point) => {
    createMarker(point);
  });
  nextButton.remove();
});

*/
