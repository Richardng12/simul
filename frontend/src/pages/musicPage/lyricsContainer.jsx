/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './styles/lyrics.module.css';
import { GET_LYRIC } from '../../config/config';
import SmallLoader from '../../general/SmallLoader';

const getLyrics = async (artist, song) => {
  return fetch(`${GET_LYRIC}?artist=${artist}&song=${song}`).then(res =>
    res.json().then(data => data),
  );
};

const formatLyrics = lyrics => {
  if (lyrics[0] === '<') {
    let formatted = lyrics.replace(/&#x27;/g, "'");
    formatted = formatted.replace(/<br\/>/g, '\n');
    formatted = formatted.replace(/<\/?[^>]+(>|$)/g, '');
    return formatted;
  }
  const formatted = lyrics.substring(15);
  return formatted.slice(0, -17);
};

const formatInput = word => {
  let temp = word;
  temp = temp.replace(' ', '-');
  temp = temp.toLowerCase();
  return temp;
};

const LyricsContainer = props => {
  const { className, currentSong } = props;
  const [lyric, setLyric] = useState('');
  const [lyricLoading, setLoading] = useState(true);

  useEffect(() => {
    if (currentSong) {
      const { artists, name } = currentSong;
      const formattedSong = formatInput(name);
      const formattedArtist = formatInput(artists[0].name);
      getLyrics(formattedArtist, formattedSong).then(res => {
        setLyric(res.message ? 'Could not load lyrics' : formatLyrics(res.lyrics));
        setLoading(false);
      });
    }
  }, [currentSong]);
  return lyricLoading ? (
    <div className={classNames(styles.loader, className)}>
      <SmallLoader />
    </div>
  ) : (
    <div className={classNames(styles.lyricsContainer, className)}>{lyric}</div>
  );
};

const mapStateToProps = state => {
  return {
    currentSong: state.musicReducer.currentSong,
  };
};

export default connect(mapStateToProps)(LyricsContainer);
