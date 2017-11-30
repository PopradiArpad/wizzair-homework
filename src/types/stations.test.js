import createStations from './stations';
import Airport from './airport';

describe('Stations', () => {
  describe('create', () => {
    it('from valid JSON format', () => {
      const stations = createStations(json);
    });

    it('throws TypeError for invalid format', () => {
      expect(() => createStations('hehe')).toThrowError(TypeError);
    });
  });

  it('getAllAirports gives back all its airports', () => {
    const stations = createStations(json);
    expect(stations.getAllAirports()).toEqual([
      new Airport('Tirana', 'TIA'),
      new Airport('Baku', 'GYD'),
      new Airport('Brussels Charleroi', 'CRL')
    ]);
  });

  it('getConnectedAirportsOf gives back all connected airports of the argument Airport', () => {
    const stations = createStations(
      JSON.stringify([
        {
          iata: 'TIA',
          shortName: 'Tirana',
          connections: [{ iata: 'BUD' }, { iata: 'LTN' }]
        },
        {
          iata: 'BUD',
          shortName: 'Budapest',
          connections: [{ iata: 'DEB' }, { iata: 'WAW' }]
        },
        {
          iata: 'LTN',
          shortName: 'London Luton',
          connections: [{ iata: 'DEB' }, { iata: 'TIA' }]
        },
        {
          iata: 'WAW',
          shortName: 'Warsaw Chopin',
          connections: [{ iata: 'DEB' }, { iata: 'LTN' }]
        },
        {
          iata: 'DEB',
          shortName: 'Debrecen',
          connections: [{ iata: 'BUD' }, { iata: 'LTN' }]
        }
      ])
    );
    expect(
      stations.getConnectedAirportsOf(new Airport('Tirana', 'TIA'))
    ).toEqual([
      new Airport('Budapest', 'BUD'),
      new Airport('London Luton', 'LTN')
    ]);
  });
});

// describe('createStations', () => {
//   it('creates a list of Stations for valid format', () => {
//     const stations = createStations(json);
//     expect(stations).toEqual([
//       new Station('Tirana', 'TIA', ['BUD', 'LTN']),
//       new Station('Baku', 'GYD', ['BUD']),
//       new Station('Brussels Charleroi', 'CRL', ['WAW', 'BUD', 'CLJ'])
//     ]);
//   });
//
//   it('creates an empty list for valid format', () => {
//     const stations = createStations('hehe');
//     expect(stations).toEqual([]);
//   });
// });

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
