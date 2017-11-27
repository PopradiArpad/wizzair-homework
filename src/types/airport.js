import PropTypes from 'prop-types';

export default function Airport(shortName, iata) {
  this.shortName = shortName;
  this.iata = iata;
}

function isAirport(val) {
  return (
    typeof val === 'object' &&
    !! val && // to filter out null, because typeof null is 'object'
    typeof val.shortName === 'string' &&
    typeof val.iata === 'string'
  );
}

function isAirportOrNull(val) {
  return (val === null) || isAirport(val);
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
