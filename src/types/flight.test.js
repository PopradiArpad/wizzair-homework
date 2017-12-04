import Flight, { createFlights, FlightService, Service } from './flight';
import { isMoment } from 'moment';

describe('Flight', () => {
  describe('constructor', () => {
    it('constructed object has the right types', () => {
      const flight = new Flight(`2017-12-03T10:11:00`, `2017-12-03T12:11:00`, [
        {
          service: 'basic',
          remainingtickets: 10,
          price: '11€'
        },
        {
          service: 'wizzgo',
          remainingtickets: 20,
          price: '21€'
        },
        {
          service: 'wizzplus',
          remainingtickets: 30,
          price: '31€'
        }
      ]);
      expect(isMoment(flight.departureTime)).toEqual(true);
      expect(isMoment(flight.departureTime)).toEqual(true);
      expect(Array.isArray(flight.services)).toEqual(true);
      const aService = flight.services[0];
      expect(aService.service).toEqual(Service.BASIC);
      expect(aService.remainingtickets).toEqual(10);
      expect(aService.price).toEqual('11€');
    });
  });

  describe('createFlights', () => {
    it('from valid JSON format', () => {
      const flights = createFlights(json);
      expect(flights).toEqual([
        new Flight(`2017-12-03T10:11:00`, `2017-12-03T12:11:00`, [
          {
            service: 'basic',
            remainingtickets: 10,
            price: '11€'
          },
          {
            service: 'wizzgo',
            remainingtickets: 20,
            price: '21€'
          },
          {
            service: 'wizzplus',
            remainingtickets: 30,
            price: '31€'
          }
        ]),
        new Flight(`2017-12-03T16:22:00`, `2017-12-03T18:22:00`, [
          {
            service: 'basic',
            remainingtickets: 0,
            price: '12€'
          },
          {
            service: 'wizzgo',
            remainingtickets: 21,
            price: '22€'
          },
          {
            service: 'wizzplus',
            remainingtickets: 31,
            price: '32€'
          }
        ])
      ]);
    });

    it('throws TypeError for invalid format', () => {
      expect(() => createFlights('hehe')).toThrowError(TypeError);
    });
  });
});

const json = JSON.stringify([
  {
    departureTime: `2017-12-03T10:11:00`,
    arrivalTime: `2017-12-03T12:11:00`,
    services: [
      {
        service: 'basic',
        remainingtickets: 10,
        price: '11€'
      },
      {
        service: 'wizzgo',
        remainingtickets: 20,
        price: '21€'
      },
      {
        service: 'wizzplus',
        remainingtickets: 30,
        price: '31€'
      }
    ]
  },
  {
    departureTime: `2017-12-03T16:22:00`,
    arrivalTime: `2017-12-03T18:22:00`,
    services: [
      {
        service: 'basic',
        remainingtickets: 0,
        price: '12€'
      },
      {
        service: 'wizzgo',
        remainingtickets: 21,
        price: '22€'
      },
      {
        service: 'wizzplus',
        remainingtickets: 31,
        price: '32€'
      }
    ]
  }
]);
