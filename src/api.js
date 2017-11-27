import axios from 'axios';

export async function apifetchStations() {
  const {data} = await axios.get('http://78.24.185.27:8570/asset/stations');
  return data;
}
