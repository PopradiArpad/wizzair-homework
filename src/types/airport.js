import PropTypes from 'prop-types';

export default class Airport {
  constructor(shortName, iata) {
    this.shortName = shortName;
    this.iata = iata;
  }

  isEqual(obj) {
    return (
      !!obj.constructor &&
      obj.constructor === Airport &&
      this.shortName === obj.shortName &&
      this.iata === obj.iata
    );
  }

  airportText() {
    return `${this.shortName}(${this.iata})`;
  }
}

function isAirport(val) {
  return (
    !!val.constructor &&
    val.constructor === Airport &&
    typeof val.shortName === 'string' &&
    typeof val.iata === 'string'
  );
}

function isAirportOrNull(val) {
  return val === null || isAirport(val);
}

Airport.PropType = function AirportPropType(props, propName, componentName) {
  const obj = props[propName];

  if (!isAirportOrNull(obj)) {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Validation failed.'
    );
  }
};

Airport.ArrayPropType = PropTypes.arrayOf(function(
  propValue,
  key,
  componentName,
  location,
  propFullName
) {
  const obj = propValue[key];

  if (!isAirportOrNull(obj)) {
    return new Error(
      'Invalid prop `' +
        propFullName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Validation failed.'
    );
  }
});

//It creates an Airport instance.
//It throws an Error if obj is not appropriate
Airport.createFromObject = function(obj) {
  if (!(obj.shortName !== undefined && obj.iata !== undefined)) {
    throw new TypeError();
  }
  return new Airport(obj.shortName, obj.iata);
};
