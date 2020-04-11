import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { getUserInfo } from './store/profile/profileActions';

const Test = props => {
  const { userInfo, accessToken } = props;

  const [showPlayer, setShowPlayer] = useState(false);
  useEffect(() => {
    userInfo();
  }, []);

  return (
    <div>
      <button onClick={() => setShowPlayer(true)} type="button">
        Hello
      </button>
      {showPlayer ? (
        <SpotifyWebPlayer
          token={accessToken}
          uris={[
            'spotify:track:6Ozh9Ok6h4Oi1wUSLtBseN',
            'spotify:track:6HbI4e2Y2f6HYVV6r04M4W',
            'spotify:track:7m9OqQk4RVRkw9JJdeAw96',
          ]}
          autoPlay
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  accessToken: state.profileReducer.token,
});

const mapDispatchToProps = dispatch => ({
  userInfo: bindActionCreators(getUserInfo, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Test);
