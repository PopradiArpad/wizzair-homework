import PropTypes from 'prop-types';

export default function Airport(shortName, iata) {
  this.shortName = shortName;
  this.iata = iata;
}

function isAirport(obj) {
  return (
    typeof obj === 'object' &&
    typeof obj.shortName === 'string' &&
    typeof obj.iata === 'string'
  );
}

Airport.PropType = function AirportPropType(props, propName, componentName) {
  const obj = props[propName];

  if (!isAirport(obj)) {
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

  if (!isAirport(obj)) {
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
