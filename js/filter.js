const mapFiltersContainerElement = document.querySelector('.map__filters');

const mapFilterTypeElement = mapFiltersContainerElement.querySelector( '[name="housing-type"]');
const mapFilterPriceElement = mapFiltersContainerElement.querySelector( '[name="housing-price"]');
const mapFilterRoomNumberElement = mapFiltersContainerElement.querySelector( '[name="housing-rooms"]');
const mapFilterCapacityElement = mapFiltersContainerElement.querySelector( '[name="housing-guests"]');

const mapFeaturesFilterElement = Array.from(mapFiltersContainerElement.querySelectorAll('[name="features"]'));

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

const filterPrice = (price) => {
  switch (mapFilterPriceElement.value) {
    case 'any':
      return true;
    case 'low':
      return  filterPriceRange.low.min <= price < filterPriceRange.low.max;
    case 'middle':
      return filterPriceRange.middle.min <= price < filterPriceRange.middle.max;
    case 'high':
      return filterPriceRange.high.min <= price;
  }
};

const filterType = (type) => mapFilterTypeElement.value === 'any' || mapFilterTypeElement.value === type;
const filterRoomsNumber = (roomsNumber) => mapFilterRoomNumberElement.value === 'any' || Number(mapFilterRoomNumberElement.value) === roomsNumber;
const filterCapacity = (guests) => mapFilterCapacityElement.value === 'any' || Number(mapFilterCapacityElement.value) === guests;


const filterFeatures = (features, selectedFeatures) => {
  if (selectedFeatures.length > 0) {
    if (features === undefined) {
      return false;
    }

    for (let i = 0; i < selectedFeatures.length; i++) {
      if (!features.includes(selectedFeatures[i].value)) {
        return false;
      }
    }
  }

  return true;
};

const filterData = (ads, resultLength) => {
  const resultArray = [];
  const selectedFeatures = mapFeaturesFilterElement.filter((featureElement) => featureElement.checked);

  for (let i = 0; i < ads.length; i++) {
    const isMatch = filterType(ads[i].offer.type)
    && filterPrice(ads[i].offer.price)
    && filterRoomsNumber(ads[i].offer.rooms)
    && filterCapacity(ads[i].offer.guests)
    && filterFeatures(ads[i].offer.features, selectedFeatures);

    if (isMatch) {
      resultArray.push(ads[i]);

      if (resultArray.length === resultLength) {
        break;
      }
    }
  }
  return resultArray;
};

const onMapFilterInputChange = (actions, array, resultLength) => actions(filterData(array, resultLength));

const setMapFiltersListener = (actions, array, resultLength) => mapFiltersContainerElement.addEventListener('change', () => onMapFilterInputChange(actions, array, resultLength));

export {
  setMapFiltersListener
};
