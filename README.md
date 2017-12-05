# WizzAir homework

## Specification
Készíts egy oldalt, ahol egy kereső szerepel:
2 select, amiből az induló és cél várost lehet kiválasztani
azonos városokat nem lehet kiválasztani
csak azok a városok jelenjenek meg célként, ahova valóban van csatlakozása a reptérnek (/asset/stations válaszban a connections tömbben találod ezeket)
ha reloadoljuk az oldalt, legyen kitöltve az induló és cél város az előző keresésből
2 dátum választó, amiből az induló és a visszaút időpontja választható ki
a visszaút időpontjának nagyobbnak kell lennie, mint az induló
submit esetén legyen validálás
hiba esetén jelenjen meg a mezők alatt az üzenet

ha valid a form:
attól függően, hogy van e vissza út, legyen egy vagy két lista, amiben a kiválasztott napon és útvonalon induló járatok jelennek meg, kilistázva a 3 jegy típust egy-egy gombbal, amivel kiválaszthatjuk azt. ha nincs már jegy (remainingTickets), ne legyen ott a gomb
egy járatra csak egy fajta jegy típus választható
egy napon csak egy járatra lehetséges jegyet venni
ha nem választott visszautat, az első lista alatt legyen egy gomb, amivel kiválaszthatja annak időpontját
ha kiválasztja a visszaút dátumát, jelenjen meg a fentihez hasonló lista, csak a visszaút járataival

A kiválasztott jegyekről legyen ez összesítő, amiben szerepel:
kiválasztott jegy útvonala, dátuma és típusa (basic, standard vagy plus), ár
az alján egy teljes summázás

Az összes állomást erről az endpointról tudod lekérdezni: http://78.24.185.27:8570/asset/stations

Keresni pedig itt tudsz:
http://78.24.185.27:8570/search?departureStation=BUD&arrivalStation=BCN&date=2017-10-25
departureStation és arrivalStation az IATA kódját kéri a reptérnek
a date-et YYYY-MM-DD formában kell megadni

A megvalósításban semmilyen megkötés nincs, használhatsz bármilyen frameworköt (annak örülünk, ha vue.js-ben készül el), extra libet, egyetlen kitétel lenne csak, hogy ES6-ban legyen a kód.


## Installing
After cloning this repository:
```
npm i
npm run build-css
npm run build
```
To run it from a local server install `serve` and run it:
```
npm install -g serve
serve -s build
```

If the test server is down, the api calls are faked.
The return format of the api http://78.24.185.27:8570/search?departureStation=IATA&arrivalStation=IATA&date=YYYY-MM-DD
is guessed by me.

## Development
It's created with __[create-react-app](https://github.com/facebookincubator/create-react-app)__.

Start css creation with

```
npm run watch-css
```
Start the development server with

```
npm run start
```

## Test
Run:

```
npm run test
```
