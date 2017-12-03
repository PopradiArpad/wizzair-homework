import axios from 'axios';

export async function apifetchStations() {
  const {data} = await axios.get('http://78.24.185.27:8570/asset/stations');
  return data;
}

//type departureIata is iata string
//type arrivalIata is iata string
//type date is Moment
//TODO:ADAPT THE RETURN VALUE TO THE REAL API
export async function apiFetchFlights(departureIata, arrivalIata, date) {
  const {data} = await axios.get(`http://78.24.185.27:8570/search?departureIata=${departureIata}&arrivalIata=${arrivalIata}&date=${date.format('YYYY-MM-DD')}`);
  return data;
}
