export default function Airport(city, iata) {
  this.city = city;
  this.iata = iata;
}

Airport.PropType = function AirportPropType(props, propName, componentName) {
  const obj = props[propName];
  if (
    !(
      typeof obj === 'object' &&
      typeof obj.city === 'string' &&
      typeof obj.iata === 'string'
    )
  ) {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Validation failed.'
    );
  }
}
