export const Service = {
  BASIC: 'BASIC',
  WIZZGO: 'WIZZGO',
  WIZZPLUS: 'WIZZPLUS'
};


//type service is Service
//type remainingTickets is number
//type price string
export class FlightService {
  constructor(service, remainingTickets, price) {
    this.service = service;
    this.remainingTickets = remainingTickets;
    this.price = price;
  }
}

//type departureTime is Moment or null
//type returnTime is Moment or null
//type flightServices is [FlightService]
export default class Flight {
  constructor(departureTime, returnTime, flightServices) {
    this.departureTime = departureTime;
    this.returnTime = returnTime;
    this.flightServices = flightServices;
  }
}

export function createFlights(json) {
  return json;
}
