import Airport from './airport';

export default function Station(shortName, iata) {
  this.airport = new Airport(shortName, iata);
}
