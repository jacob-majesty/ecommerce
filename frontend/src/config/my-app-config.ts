import { environment } from '../environments/environment';

export default {
  auth: {
    domain: environment.auth0.domain,
    clientId: environment.auth0.clientId,
    authorizationParams: {
      redirect_uri: environment.auth0.redirectUri,
      audience: environment.auth0.audience,
    },
  },
  httpInterceptor: {
    allowedList: [
      'http://localhost:8080/api/orders/**',
      'http://localhost:8080/api/checkout/purchase'
    ],
  },
}
