import React from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { connect } from 'react-redux';

const MusicPlayer = props => {
  const { accessToken, lobby } = props;

  console.log(lobby);
  // const songs = lobby.songs.map(song => `spotify:track:${song.spotifyId}`);
  const currentSongs = [
    'spotify:track:2hnxrRNzF74mdDzpQZQukQ',
    // 'spotify:track:7m9OqQk4RVRkw9JJdeAw96',
  ];
  return <SpotifyWebPlayer token={accessToken} uris={currentSongs} autoPlay />;
};

const mapStateToProps = state => ({
  accessToken: state.profileReducer.token,
  lobby: state.lobbyReducer.currentLobby,
});

export default connect(mapStateToProps)(MusicPlayer);
