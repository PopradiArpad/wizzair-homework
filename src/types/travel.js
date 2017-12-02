//type originAirport is Airport or null
//type destinationAirport is Airport or null
//type departureDate is Moment or null
//type returnDate is Moment or null
export default class Travel {
  constructor(originAirport, destinationAirport, departureDate, returnDate) {
    this.originAirport = originAirport;
    this.destinationAirport = destinationAirport;
    this.departureDate = departureDate;
    this.returnDate = returnDate;
  }
}
