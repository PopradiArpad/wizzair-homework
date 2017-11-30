import Station, { createStations } from './station';
import Airport from './airport';

describe('Station', () => {
  it('create from shortName, iata and connections', () => {
    const station = new Station('Budapest', 'BUD', ['DEB', 'LTN']);
    expect(station.airport.isEqual(new Airport('Budapest', 'BUD'))).toBe(true);
    expect(station.connections).toEqual(['DEB', 'LTN']);
  });
});

describe('createStations', () => {
  it('creates a list of Stations for valid format', () => {
    const stations = createStations(json);
    expect(stations).toEqual([
      new Station('Tirana', 'TIA', ['BUD', 'LTN']),
      new Station('Baku', 'GYD', ['BUD']),
      new Station('Brussels Charleroi', 'CRL', ['WAW', 'BUD', 'CLJ'])
    ]);
  });

  it('creates an empty list for valid format', () => {
    const stations = createStations('hehe');
    expect(stations).toEqual([]);
  });
});

const json = JSON.stringify([
  {
    iata: 'TIA',
    longitude: 19.720555555555553,
    currencyCode: 'EUR',
    latitude: 41.414722222222224,
    shortName: 'Tirana',
    countryName: 'Albania',
    countryCode: 'AL',
    connections: [
      {
        iata: 'BUD',
        operationStartDate: '2017-12-02T00:00:00',
        rescueEndDate: '2017-11-30T09:35:12.2717473+00:00',
        isDomestic: false
      },
      {
        iata: 'LTN',
        operationStartDate: '2018-05-31T00:00:00',
        rescueEndDate: '2017-11-30T09:35:12.2717473+00:00',
        isDomestic: false
      }
    ],
    aliases: ['Tirana'],
    isExcludedFromGeoLocation: false,
    rank: 1,
    categories: [7, 8, 9, 0]
  },
  {
    iata: 'GYD',
    longitude: 50.051944444444445,
    currencyCode: 'EUR',
    latitude: 40.465,
    shortName: 'Baku',
    countryName: 'Azerbaijan',
    countryCode: 'AZ',
    connections: [
      {
        iata: 'BUD',
        operationStartDate: '2017-12-04T00:00:00',
        rescueEndDate: '2017-11-30T09:35:12.2717473+00:00',
        isDomestic: false
      }
    ],
    aliases: ['Baku'],
    isExcludedFromGeoLocation: false,
    rank: 1,
    categories: [1, 6, 7, 8, 9, 0]
  },
  {
    iata: 'CRL',
    longitude: 4.4538888888888888,
    currencyCode: 'EUR',
    latitude: 50.459166666666668,
    shortName: 'Brussels Charleroi',
    countryName: 'Belgium',
    countryCode: 'BE',
    connections: [
      {
        iata: 'WAW',
        operationStartDate: '2017-12-01T00:00:00',
        rescueEndDate: '2017-11-30T09:35:12.2717473+00:00',
        isDomestic: false
      },
      {
        iata: 'BUD',
        operationStartDate: '2017-12-01T00:00:00',
        rescueEndDate: '2017-11-30T09:35:12.2717473+00:00',
        isDomestic: false
      },
      {
        iata: 'CLJ',
        operationStartDate: '2017-12-01T00:00:00',
        rescueEndDate: '2017-11-30T09:35:12.2717473+00:00',
        isDomestic: false
      }
    ],
    aliases: ['Brussels Charleroi'],
    isExcludedFromGeoLocation: false,
    rank: 1,
    categories: [1, 8, 0]
  }
]);
