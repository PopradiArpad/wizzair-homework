import moment from 'moment';
import LodashIsEqual from 'lodash.isequal';

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
  //     price: '€21'  currency is the first character
  //   }
  // ]
  constructor(departureTime, returnTime, services) {
    this.departureTime = moment(departureTime);
    this.returnTime = moment(returnTime);
    this.services = services;
  }

  isEqual(obj) {
    return LodashIsEqual(this, obj);
  }
}

//type flight is Flight
//type service is Service
export class SelectedFlight {
  constructor(flight, service) {
    this.flight = flight;
    this.service = service;
  }

  getSelectedService() {
    return this.flight.services.find(serv => serv.service === this.service);
  }

  getPrice() {
    return this.getSelectedService().price;
  }

  getPriceAsNumber() {
    return parseFloat(this.getPrice().slice(1));
  }

  getCurrency() {
    return this.getPrice().slice(0, 1);
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
