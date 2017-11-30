import Airport from './airport';

export default function Station(shortName, iata, connections) {
  this.airport = new Airport(shortName, iata);
  this.connections = connections;
}

export function createStations(json) {
  try {
    const cities = JSON.parse(json);
    return cities.map(city => {
      const connections = city.connections.map(c => c.iata);
      return new Station(city.shortName, city.iata, connections);
    });
  } catch (e) {
    return [];
  }
}
