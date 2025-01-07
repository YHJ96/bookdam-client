declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_KAKAO_LOGIN_URL: string;
    NEXT_PUBLIC_GOOGLE_LOGIN_URL: string;
    NEXT_PUBLIC_SERVER_URL: string;
    NEXT_PUBLIC_SECRET_KEY: string;
    NEXT_PUBLIC_NEXT_SERVER_URL: string;
    NEXT_PUBLIC_EMPTY_IMAGE: string;
    CYPRESS_ACCESS: string;
    CYPRESS_SERVER_URL: string;
  }
}
