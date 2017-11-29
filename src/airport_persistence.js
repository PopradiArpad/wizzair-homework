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
    return Airport.createFromObject(json.originAirport);
  } catch (e) {
    return undefined;
  }
}

export function writeAirportsToCookie(originAirport, destinationAirport) {
  document.cookie = JSON.stringify({ originAirport, destinationAirport });
}
