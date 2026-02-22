export const environment = {
  production: true,
  shopApiUrl: 'https://api.yourdomain.com/api',
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
          uri: 'http://localhost:80/*',
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
  },
  stripe: {
    publishableKey: 'STRIPE_PUBLISHABLE_KEY_PLACEHOLDER'
  }
};
