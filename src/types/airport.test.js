import Airport from './airport';

describe('Airport', () => {
  describe('createFromJSON', () => {
    it('it works for right format', () => {
      // const airport = new Airport('Budapest','BUD');
      const airport = Airport.createFromObject({
        shortName: 'Budapest',
        iata: 'BUD'
      });
      expect(airport.isEqual(new Airport('Budapest', 'BUD'))).toBe(true);
    });

    describe('it throws TypeError for wrong format', () => {
      it('for empty object', () => {
        expect(()=>Airport.createFromObject({})).toThrowError(TypeError);
      });
      it('for missing shortName', () => {
        expect(()=>Airport.createFromObject({iata: 'BUD'})).toThrowError(TypeError);
      });
      it('for missing iata', () => {
        expect(()=>Airport.createFromObject({shortName: 'Budapest'})).toThrowError(TypeError);
      });
    });
  });
});
