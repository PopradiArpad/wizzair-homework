import {
  readAirportsFromCookie,
  writeAirportsToCookie
} from './airport_persistence';
import Airport from './types/airport';

describe('Airport persistency', () => {
  beforeEach(() => {
    document.cookie = undefined;
  });

  describe('writeAirportsToCookie', () => {
    it('it works if there is originAirport and destinationAirport', () => {
      const originAirport = new Airport('Budapest', 'BUD');
      const destinationAirport = new Airport('Debrecen', 'DEB');
      writeAirportsToCookie(originAirport, destinationAirport);
      expect(document.cookie).toEqual(
        '{"originAirport":{"shortName":"Budapest","iata":"BUD"},"destinationAirport":{"shortName":"Debrecen","iata":"DEB"}}'
      );
    });

    it('it works if there is only originAirport', () => {
      const originAirport = new Airport('Budapest', 'BUD');
      writeAirportsToCookie(originAirport, undefined);
      expect(document.cookie).toEqual(
        '{"originAirport":{"shortName":"Budapest","iata":"BUD"}}'
      );
    });

    it('it works if there is only destinationAirport', () => {
      const destinationAirport = new Airport('Budapest', 'BUD');
      writeAirportsToCookie(undefined, destinationAirport);
      expect(document.cookie).toEqual(
        '{"destinationAirport":{"shortName":"Budapest","iata":"BUD"}}'
      );
    });

    it('it works if there is no originAirport or destinationAirport', () => {
      writeAirportsToCookie(undefined, undefined);
      expect(document.cookie).toEqual('{}');
    });
  });

  describe('readAirportsFromCookie', () => {
    it('it works if there is originAirport and destinationAirport', () => {
      document.cookie =
        '{"originAirport":{"shortName":"Budapest","iata":"BUD"},"destinationAirport":{"shortName":"Debrecen","iata":"DEB"}}';
      const result = readAirportsFromCookie();
      expect(result).toEqual({
        originAirport: new Airport('Budapest', 'BUD'),
        destinationAirport: new Airport('Debrecen', 'DEB')
      });
    });

    it('it works if there is only originAirport', () => {
      document.cookie =
        '{"originAirport":{"shortName":"Budapest","iata":"BUD"}}';
      const result = readAirportsFromCookie();
      expect(result).toEqual({
        originAirport: new Airport('Budapest', 'BUD')
      });
    });

    it('it works if there is only originAirport', () => {
      document.cookie =
        '{"destinationAirport":{"shortName":"Budapest","iata":"BUD"}}';
      const result = readAirportsFromCookie();
      expect(result).toEqual({
        destinationAirport: new Airport('Budapest', 'BUD')
      });
    });

    it('it works if there is no originAirport or destinationAirport', () => {
      const result = readAirportsFromCookie();
      expect(result).toEqual({});
    });
  });
});
