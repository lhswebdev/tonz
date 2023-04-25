import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    SpotifyProvider({
      //@ts-ignore
      clientId: process.env.SPOTIFY_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative',
        },
      },
    }),

    // ...add more providers here
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
  },
};
export default NextAuth(authOptions);
