import Airport from './types/airport';

export function readAirportsFromCookie() {
  try {
    const json = JSON.parse(document.cookie);
    const originAirport = tryCreateAirportFromObject(json.originAirport);
    const destinationAirport = tryCreateAirportFromObject(
      json.destinationAirport
    );
    return { originAirport, destinationAirport };
  } catch (e) {
    return {};
  }
}

function tryCreateAirportFromObject(obj) {
  try {
    const airport = Airport.createFromObject(obj);
    return  airport;
  } catch (e) {
    return undefined;
  }
}

export function writeAirportsToCookie(originAirport, destinationAirport) {
  document.cookie = JSON.stringify({ originAirport, destinationAirport });
}
