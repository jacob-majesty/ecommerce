export const environment = {
  production: true,
  shopApiUrl: 'https://majesty-ecommerce.avzkcaqgtxkhj.us-east-1.cs.amazonlightsail.com/',
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
    publishableKey: 'pk_test_51T3OoqCvwjVQxybvKBC78H0FikGYFlp915rONy4JH2GpNI27Wh0tOPf4iGtKhQ5G45EJHuGuHESF0ttyOdd6NiSI00Uetz9Szc'
  }
};
