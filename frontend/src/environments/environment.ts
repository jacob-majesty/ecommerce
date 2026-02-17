export const environment = {
  production: false,
  auth0: {
    domain: 'AUTH0_DOMAIN_PLACEHOLDER',
    clientId: 'AUTH0_CLIENT_ID_PLACEHOLDER',
    authorizationParams: {
      redirect_uri: 'AUTH0_REDIRECT_URI_PLACEHOLDER',
      audience: 'AUTH0_AUDIENCE_PLACEHOLDER',
    },
    httpInterceptor: {
      allowedList: [
        {
          uri: 'http://localhost:8080/*',
          httpMethod: 'GET',
          tokenOptions: {
            authorizationParams: {
              audience: 'AUTH0_AUDIENCE_PLACEHOLDER',
              scope: 'openid profile email'
            }
          }
        }
      ]
    }
  }
};
