export default function getFakeFlightsFetch(date) {
  const dateString = date.format('YYYY-MM-DD');

  return JSON.stringify([
    {
      departureTime: `${dateString}T10:11:00`,
      arrivalTime: `${dateString}T12:11:00`,
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
      departureTime: `${dateString}T16:22:00`,
      arrivalTime: `${dateString}T18:22:00`,
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
}
