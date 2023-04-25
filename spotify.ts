import SpotifyWebApi from 'spotify-web-api-node';

export const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export const getTopTracks = () => {
  return SpotifyApi.getMyTopTracks().then(
    (data) => {
      return data.body;
    },
    (err) => {
      throw err;
    }
  );
};

export const getCurrentlyPlaying = () => {
  return SpotifyApi.getMyCurrentPlayingTrack().then(
    (data) => {
      return data.body;
    },
    (err) => {
      throw err;
    }
  );
};
