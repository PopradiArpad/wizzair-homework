import moment from 'moment';

//type originAirport is Airport or null
//type destinationAirport is Airport or null
//type departureDate is Moment or null
//type returnDate is Moment or null
export class TravelAirport {
  //type originAirport is Airport or null
  //type destinationAirport is Airport or null
  //type departureDate is Moment/Momentable string or null
  //type returnDate is Moment/Momentable string or null
  constructor(originAirport, destinationAirport, departureDate, returnDate) {
    this.originAirport = originAirport;
    this.destinationAirport = destinationAirport;
    this.departureDate = momentOrNull(departureDate);
    this.returnDate = momentOrNull(returnDate);
  }
}

//type originIata is iata string or null
//type destinationIata is iata string or null
//type departureDate is Moment or null
//type returnDate is Moment or null
export class TravelIata {
  //type originIata is iata string or null
  //type destinationIata is iata string or null
  //type departureDate is Moment/Momentable string or null
  //type returnDate is Moment/Momentable string or null
  constructor(originIata, destinationIata, departureDate, returnDate) {
    this.originIata = originIata;
    this.destinationIata = destinationIata;
    this.departureDate = momentOrNull(departureDate);
    this.returnDate = momentOrNull(returnDate);
  }
}

function momentOrNull(val) {
  return val === null ? null : moment(val);
}
