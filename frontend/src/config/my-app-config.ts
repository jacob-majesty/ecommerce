import { environment } from '../environments/environment';

export default {
  auth: {
    domain: environment.auth0.domain,
    clientId: environment.auth0.clientId,
    authorizationParams: environment.auth0.authorizationParams,
  }
};
