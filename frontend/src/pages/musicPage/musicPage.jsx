import React from 'react';
import { useParams } from 'react-router';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { connect } from 'react-redux';
import AppBar from './components/appBar';
import LyricsContainer from './lyricsContainer';
import QueueContainer from './queueContainer';
import SocialContainer from './socialContainer';

import styles from './styles/musicPage.module.css';

const MusicPage = props => {
  const { accessToken } = props;
  const { id } = useParams();
  return (
    <div className={styles.root}>
      <AppBar title={id} />
      <div className={styles.mostStuff}>
        <div className={styles.playerStuff}>
          <QueueContainer />
          <SpotifyWebPlayer
            token={accessToken}
            uris={[
              'spotify:track:6Ozh9Ok6h4Oi1wUSLtBseN',
              'spotify:track:6HbI4e2Y2f6HYVV6r04M4W',
              'spotify:track:7m9OqQk4RVRkw9JJdeAw96',
            ]}
            autoPlay
          />
        </div>
        <div className={styles.nonPlayerStuff}>
          <LyricsContainer />
          <SocialContainer />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  accessToken: state.profileReducer.token,
});

export default connect(mapStateToProps)(MusicPage);
