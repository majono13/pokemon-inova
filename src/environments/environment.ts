// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  openweathermapUrl: 'https://api.openweathermap.org/data/2.5/weather',
  openweathermapApiKey: '1516bd7eff454e961393fce8a024fd05',
  pokemonUrl: 'https://pokeapi.co/api/v2/type',
  firebaseConfig: {
  apiKey: "AIzaSyBV-tW2eTdDyuO5jpokA6LN5fIylWQUBuU",
  authDomain: "pokemon-inova.firebaseapp.com",
  projectId: "pokemon-inova",
  storageBucket: "pokemon-inova.appspot.com",
  messagingSenderId: "475771585861",
  appId: "1:475771585861:web:888ab54eadee379aecaa2c",
  measurementId: "G-728E782G7D"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
