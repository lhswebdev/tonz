import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: string;
    user: {
      /** The user's name. */
      accessToken: string;
      exp: number;
      expires_at: number;
      iat: number;
      jti: string;
      name: string;
      picture: string;
      sub: string;
    };
  }
}
