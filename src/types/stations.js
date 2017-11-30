import Airport from './airport';
import cloneDeep from 'lodash.clonedeep';

export default function createStations(json) {
  function parseJSON(json) {
    try {
      const cities = JSON.parse(json);
      return cities.reduce(
        (data, city) => {
          const iata = city.iata;
          const airport = new Airport(city.shortName, iata);

          data.airports.push(airport);
          data.iataToAirport[iata] = airport;
          data.connections[iata] = city.connections.map(obj=>obj.iata);
          return data;
        },
        {
          airports: [], // type: [Airport]
          iataToAirport: {}, // type: iata -> Airport
          connections: {} // type: iata -> [iata]
        }
      );
    } catch (e) {
      throw new TypeError('JSON format is not valid');
    }
  }

  const data = parseJSON(json);
  
  function getAllAirports() {
    return cloneDeep(data.airports);
  }

  function getConnectedAirportsOf(airport) {
    const connections = data.connections[airport.iata];
    return cloneDeep(connections.map(iata=>data.iataToAirport[iata]));
  }

  return {
    getAllAirports,
    getConnectedAirportsOf
  };
}
