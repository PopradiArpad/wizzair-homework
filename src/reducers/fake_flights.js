export default function createFakeFlights(date) {
  const dateString = date.format('YYYY-MM-DD');

  return JSON.stringify([
    {
      departureDate: `${dateString}T10:11:00`,
      arrivalDate: `${dateString}T12:11:00`,
      services: [
        {
          service: 'basic',
          remainingtickets: 10
        },
        {
          service: 'wizzgo',
          remainingtickets: 20
        },
        {
          service: 'wizzplus',
          remainingtickets: 30
        }
      ]
    },
    {
      departureDate: `${dateString}T16:22:00`,
      arrivalDate: `${dateString}T18:22:00`,
      services: [
        {
          service: 'basic',
          remainingtickets: 0
        },
        {
          service: 'wizzgo',
          remainingtickets: 21
        },
        {
          service: 'wizzplus',
          remainingtickets: 31
        }
      ]
    }
  ]);
}
