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

const filterFeatures = (features) => {
  const selectedFeatures = mapFeaturesFilterElement.filter((featureElement) => featureElement.checked);
  let isAcceptable = true;

  if (features === undefined && selectedFeatures.length > 0) {
    isAcceptable = false;
    return isAcceptable;
  }

  for (let i = 0; i < selectedFeatures.length; i++) {
    isAcceptable = features.includes(selectedFeatures[i].value);
    if (!isAcceptable) {
      return isAcceptable;
    }
  }

  return isAcceptable;
};

const filterData = (array, resultLength) => {
  const resultArray = [];

  for (let i = 0; i < array.length; i++) {
    const isMatch = filterType(array[i].offer.type)
    && filterPrice(array[i].offer.price)
    && filterRoomsNumber(array[i].offer.rooms)
    && filterCapacity(array[i].offer.guests)
    && filterFeatures(array[i].offer.features);

    if (isMatch) {
      resultArray.push(array[i]);

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
