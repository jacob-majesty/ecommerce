export const environment = {
  production: true,
  auth0: {
    // These values will be replaced at build time by the actual environment variables
    domain: '${AUTH0_DOMAIN}',
    clientId: '${AUTH0_CLIENT_ID}',
    redirectUri: '${AUTH0_REDIRECT_URI}',
    audience: '${AUTH0_AUDIENCE}',
  }
};
