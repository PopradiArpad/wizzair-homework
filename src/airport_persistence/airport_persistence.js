import Airport from '../types/airport';

export function readAirportsFromCookie() {
  let result = {
    originAirport: null,
    destinationAirport: null
  };

  try {
    const json = JSON.parse(document.cookie);
    result.originAirport = tryCreateAirportFromObject(json.originAirport);
    result.destinationAirport = tryCreateAirportFromObject(
      json.destinationAirport
    );
  } catch (e) {
  } finally {
    return result;
  }
}

function tryCreateAirportFromObject(obj) {
  try {
    const airport = Airport.createFromObject(obj);
    return airport;
  } catch (e) {
    return null;
  }
}

export function writeAirportsToCookie(originAirport, destinationAirport) {
  document.cookie = JSON.stringify({ originAirport, destinationAirport });
}
