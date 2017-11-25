export default function Airport(shortName, iata) {
  this.shortName = shortName;
  this.iata = iata;
}

Airport.PropType = function AirportPropType(props, propName, componentName) {
  const obj = props[propName];
  if (
    !(
      typeof obj === 'object' &&
      typeof obj.shortName === 'string' &&
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
