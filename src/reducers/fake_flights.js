export default function getFakeFlightsFetch(date,departureIata,arrivalIata) {
  const dateString = date.format('YYYY-MM-DD');
  const departureShortName = shortName[departureIata];
  const arrivalShortName = shortName[arrivalIata];

  return JSON.stringify([
    {
      departureTime: `${dateString}T10:11:00`,
      arrivalTime: `${dateString}T12:11:00`,
      departureAirport: {
        shortName:departureShortName,
        iata:departureIata
      },
      arrivalAirport: {
        shortName:arrivalShortName,
        iata:arrivalIata
      },
      services: [
        {
          service: 'basic',
          remainingtickets: 10,
          price: '€11'
        },
        {
          service: 'wizzgo',
          remainingtickets: 20,
          price: '€21'
        },
        {
          service: 'wizzplus',
          remainingtickets: 30,
          price: '€31'
        }
      ]
    },
    {
      departureTime: `${dateString}T16:22:00`,
      arrivalTime: `${dateString}T18:22:00`,
      departureAirport: {
        shortName:departureShortName,
        iata:departureIata
      },
      arrivalAirport: {
        shortName:arrivalShortName,
        iata:arrivalIata
      },
      services: [
        {
          service: 'basic',
          remainingtickets: 0,
          price: '€12'
        },
        {
          service: 'wizzgo',
          remainingtickets: 21,
          price: '€22'
        },
        {
          service: 'wizzplus',
          remainingtickets: 31,
          price: '€32'
        }
      ]
    }
  ]);
}

const shortName = {
  "TIA": "Tirana",
  "GYD": "Baku",
  "CRL": "Brussels Charleroi",
  "SJJ": "Sarajevo",
  "TZL": "Tuzla",
  "BOJ": "Bourgas (Black Sea)",
  "SOF": "Sofia",
  "VAR": "Varna (Black Sea)",
  "OSI": "Osijek",
  "SPU": "Split",
  "LCA": "Larnaca",
  "BRQ": "Brno",
  "PRG": "Prague",
  "BLL": "Billund",
  "CPH": "Copenhagen",
  "TLL": "Tallinn",
  "TKU": "Turku",
  "MLH": "Basel-Mulhouse-Freiburg",
  "BOD": "Bordeaux (Mérignac Airport)",
  "GNB": "Grenoble",
  "LYS": "Lyon -Saint-Exupéry",
  "NCE": "Nice",
  "BVA": "Paris Beauvais",
  "KUT": "Kutaisi",
  "SXF": "Berlin Schoenefeld",
  "CGN": "Cologne",
  "DTM": "Dortmund",
  "FRA": "Frankfurt",
  "HHN": "Frankfurt Hahn",
  "FDH": "Friedrichshafen",
  "HAM": "Hamburg",
  "HAJ": "Hanover",
  "FKB": "Karlsruhe/Baden-Baden",
  "FMM": "Memmingen/Munich West",
  "NUE": "Nuremberg ",
  "ATH": "Athens\r\n",
  "CFU": "Corfu",
  "HER": "Heraklion (Crete)",
  "RHO": "Rhodes",
  "SKG": "Thessaloniki",
  "ZTH": "Zakynthos",
  "BUD": "Budapest",
  "DEB": "Debrecen",
  "KEF": "Reykjavik",
  "VDA": "Eilat (Ovda)",
  "TLV": "Tel-Aviv",
  "AHO": "Alghero (Sardinia)",
  "BRI": "Bari",
  "BLQ": "Bologna",
  "CTA": "Catania (Sicily)",
  "SUF": "Lamezia Terme",
  "BGY": "Milan Bergamo",
  "MXP": "Milan Malpensa",
  "NAP": "Naples",
  "PEG": "Perugia",
  "PSR": "Pescara",
  "PSA": "Pisa (Tuscany)",
  "CIA": "Rome Ciampino",
  "FCO": "Rome Fiumicino",
  "TRN": "Turin",
  "VCE": "Venice (Marco Polo Airport)",
  "TSF": "Venice Treviso",
  "VRN": "Verona",
  "TSE": "Astana",
  "PRN": "Prishtina",
  "RIX": "Riga",
  "KUN": "Kaunas",
  "PLQ": "Palanga – Klaipeda ",
  "VNO": "Vilnius",
  "OHD": "Ohrid",
  "SKP": "Skopje",
  "MLA": "Malta",
  "KIV": "Chisinau",
  "TGD": "Podgorica",
  "AGA": "Agadir",
  "EIN": "Eindhoven",
  "GRQ": "Groningen",
  "AES": "Alesund",
  "BGO": "Bergen",
  "HAU": "Haugesund",
  "KRS": "Kristiansand",
  "MOL": "Molde",
  "TRF": "Oslo Sandefjord Torp",
  "SVG": "Stavanger",
  "TOS": "Tromso\r\n",
  "TRD": "Trondheim",
  "GDN": "Gdansk",
  "KTW": "Katowice",
  "LUZ": "Lublin",
  "SZY": "Olsztyn-Mazury",
  "POZ": "Poznan",
  "SZZ": "Szczecin",
  "WAW": "Warsaw Chopin",
  "WRO": "Wroclaw",
  "FAO": "Faro",
  "LIS": "Lisbon",
  "OPO": "Porto",
  "OTP": "Bucharest ",
  "CLJ": "Cluj-Napoca",
  "CND": "Constanta",
  "CRA": "Craiova",
  "IAS": "Iasi",
  "SUJ": "Satu Mare",
  "SBZ": "Sibiu",
  "SCV": "Suceava",
  "TSR": "Timisoara",
  "TGM": "Tirgu Mures",
  "VKO": "Moscow",
  "LED": "St Petersburg",
  "BEG": "Belgrade",
  "INI": "Niš",
  "BTS": "Bratislava",
  "KSC": "Kosice",
  "TAT": "Poprad-Tatry",
  "LJU": "Ljubljana",
  "ALC": "Alicante",
  "BCN": "Barcelona El Prat",
  "FUE": "Fuerteventura (Canary Islands)",
  "IBZ": "Ibiza",
  "ACE": "Lanzarote (Canary Islands)",
  "MAD": "Madrid",
  "AGP": "Malaga",
  "PMI": "Palma de Mallorca",
  "SDR": "Santander",
  "TFS": "Tenerife (Canary Islands)",
  "VLC": "Valencia",
  "ZAZ": "Zaragoza",
  "GOT": "Gothenburg Landvetter",
  "MMX": "Malmo",
  "NYO": "Stockholm Skavsta",
  "VXO": "Vaxjo",
  "BSL": "Basel-Mulhouse-Freiburg",
  "GVA": "Geneva",
  "HRK": "Kharkiv",
  "IEV": "Kiev - Zhulyany",
  "LWO": "Lviv",
  "DWC": "Dubai",
  "ABZ": "Aberdeen",
  "BFS": "Belfast",
  "BHX": "Birmingham",
  "BRS": "Bristol",
  "DSA": "Doncaster/Sheffield",
  "GLA": "Glasgow",
  "LPL": "Liverpool",
  "LTN": "London Luton",
  "LGW": "London Gatwick"
};
