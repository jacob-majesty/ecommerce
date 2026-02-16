declare namespace NodeJS {
  interface ProcessEnv {
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_REDIRECT_URI: string;
    AUTH0_AUDIENCE: string;
  }
}
