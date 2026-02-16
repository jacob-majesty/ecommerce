// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  auth0: {
    domain: 'dev-xxxxxx.auth0.com',  // Replace with your development Auth0 domain
    clientId: 'xxxxxxxxxxxxxxxxxxxx', // Replace with your development client ID
    redirectUri: 'http://localhost:4200/login/callback',
    audience: 'http://localhost:8080',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
