// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyCQw9oFZKcUqOSXYCc87faf6s6zJXgyYjE",
    authDomain: "app-estudiantes-92df2.firebaseapp.com",
    projectId: "app-estudiantes-92df2",
    storageBucket: "app-estudiantes-92df2.firebasestorage.app",
    messagingSenderId: "141234795571",
    appId: "1:141234795571:web:d418397f4e42b231035f46",
    measurementId: "G-1X4JCXYB5K"
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
