import React from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { connect } from 'react-redux';

const MusicPlayer = props => {
  const { accessToken } = props;
  return (
    <SpotifyWebPlayer
      token={accessToken}
      persistDeviceSelection
      uris={[
        'spotify:track:6Ozh9Ok6h4Oi1wUSLtBseN',
        'spotify:track:6HbI4e2Y2f6HYVV6r04M4W',
        'spotify:track:7m9OqQk4RVRkw9JJdeAw96',
      ]}
      autoPlay
    />
  );
};

const mapStateToProps = state => ({
  accessToken: state.profileReducer.token,
});

export default connect(mapStateToProps)(MusicPlayer);
