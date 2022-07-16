const mapFiltersContainerElement = document.querySelector('.map__filters');
const mapFilterTypeElement = mapFiltersContainerElement.querySelector( '[name="housing-type"]');
const mapFilterPriceElement = mapFiltersContainerElement.querySelector( '[name="housing-price"]');
const mapFilterRoomNumberElement = mapFiltersContainerElement.querySelector( '[name="housing-rooms"]');
const mapFilterCapacityElement = mapFiltersContainerElement.querySelector( '[name="housing-guests"]');
const mapFilterFeaturesContainerElement = mapFiltersContainerElement.querySelector( '.map__features');

const filterPriceRange = {
  low:{
    min:0,
    max:10000
  },
  middle:{
    min:10000,
    max:50000
  },
  high:{
    min:50000
  }
};

const getPriceLabel = (element) => {
  let priceLabel = 'any';
  if ( Number(element) >= Number(filterPriceRange.low.min) && Number(element) < Number(filterPriceRange.low.max) ) {
    priceLabel = 'low';
  }
  if ( Number(element) >= Number(filterPriceRange.middle.min) && Number(element) < Number(filterPriceRange.middle.max) ) {
    priceLabel = 'middle';
  }
  if ( Number(element) >= Number(filterPriceRange.high.min) ) {
    priceLabel = 'high';
  }

  return priceLabel;
};

const filterType = (type) => mapFilterTypeElement.value === 'any' || mapFilterTypeElement.value === type;
const filterPrice = (price) => mapFilterPriceElement.value === 'any' || mapFilterPriceElement.value === getPriceLabel(price);
const filterRoomsNumber = (roomsNumber) => mapFilterRoomNumberElement.value === 'any' || Number(mapFilterRoomNumberElement.value) === Number(roomsNumber);
const filterCapacity = (guests) => mapFilterCapacityElement.value === 'any' || Number(mapFilterCapacityElement.value) === Number(guests);

const filterFeature = (features, featureName) => {
  const filterElement = mapFilterFeaturesContainerElement.querySelector( `#filter-${featureName}`);
  if (filterElement.checked) {
    if (features === undefined) {
      return false;
    } else if (!features.includes(filterElement.value)) {
      return false;
    }
  }
  return true;
};

const filterData = (array) =>
  array
    .filter((ad) =>
      filterType(ad.offer.type)
      && filterPrice(ad.offer.price)
      && filterRoomsNumber(ad.offer.rooms)
      && filterCapacity(ad.offer.guests)
      && filterFeature(ad.offer.features,'wifi')
      && filterFeature(ad.offer.features,'dishwasher')
      && filterFeature(ad.offer.features,'parking')
      && filterFeature(ad.offer.features,'washer')
      && filterFeature(ad.offer.features,'elevator')
      && filterFeature(ad.offer.features,'conditioner')
    );

const onMapFilterInputChange = (renderAction, array, outputLength) => {
  const filteredAds = filterData(array);
  filteredAds.splice(outputLength);
  renderAction(filteredAds);
};


const setMapFiltersListener = (actions, array) => {
  mapFiltersContainerElement.addEventListener('change',
    () => onMapFilterInputChange(actions, array)
  );
};

export {
  setMapFiltersListener
};
