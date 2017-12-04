import moment from 'moment';

export const Service = {
  BASIC: 'basic',
  WIZZGO: 'wizzgo',
  WIZZPLUS: 'wizzplus'
};

//type departureTime is Moment
//type returnTime is Moment
//type services is
// [
//   {
//     service: Service,
//     remainingtickets: number,
//     price: '21€'
//   }
// ]
export default class Flight {
  //type departureTime is Moment/momentable string
  //type returnTime is Moment/momentable string
  //type services is
  // [
  //   {
  //     service: Service,
  //     remainingtickets: number,
  //     price: '21€'
  //   }
  // ]
  constructor(departureTime, returnTime, services) {
    this.departureTime = moment(departureTime);
    this.returnTime = moment(returnTime);
    this.services = services;
  }
}

//type flight is Flight
//type service is Service
export class SelectedFlight {
  constructor(flight, service) {
    this.flight = flight;
    this.service = service;
  }
}

//return type is [Flight]
export function createFlights(json) {
  try {
    const flights = JSON.parse(json);
    return flights.reduce((data, flight) => {
      const obj = new Flight(
        flight.departureTime,
        flight.arrivalTime,
        flight.services
      );
      return data.concat(obj);
    }, []);
  } catch (e) {
    throw new TypeError('JSON format is not valid');
  }
}
