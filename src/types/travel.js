import moment from 'moment';

//type originAirport is Airport or null
//type destinationAirport is Airport or null
//type departureDate is Moment or null
//type returnDate is Moment or null
export class TravelAirport {
  //type originAirport is Airport or null
  //type destinationAirport is Airport or null
  //type departureDate is Moment or string in 'YYYY-MM-DD' format or null or 'null' string
  //type returnDate is Moment or string in 'YYYY-MM-DD' format or null or 'null' string
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
  //type departureDate is Moment or string in 'YYYY-MM-DD' format or null or 'null' string
  //type returnDate is Moment or string in 'YYYY-MM-DD' format or null or 'null' string
  constructor(originIata, destinationIata, departureDate, returnDate) {
    this.originIata = originIata;
    this.destinationIata = destinationIata;
    this.departureDate = momentOrNull(departureDate);
    this.returnDate = momentOrNull(returnDate);
  }
}

function momentOrNull(val) {
  if (val === null || val === 'null') {
    return null;
  }

  if (typeof val === 'string') {
    return moment(val, 'YYYY-MM-DD');
  }

  return moment(val);
}
