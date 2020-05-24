import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import style from './musicPlayer.module.css';

const Progress = props => {
  const { songTime, setCurrentTime, currentTime, startProgress } = props;
  const [musicProgress, setMusicProgress] = useState(0);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (songTime !== 0 && startProgress) {
      const interval = setInterval(() => {
        setCurrentTime(currentTime + 5);
        const percent = (currentTime / songTime) * 100;
        setMusicProgress(percent);
      }, 5);

      return () => clearInterval(interval);
    }
  }, [currentTime, songTime, startProgress]);

  const millisToMinutesAndSeconds = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={style.progress}>
      <div className={style.loaderContainer}>
        <div className={style.loader} style={{ width: `${musicProgress}%` }} />
      </div>
      <div className={style.timeContainer}>
        <p className={classNames(style.playerText, style.currentTime)}>
          {millisToMinutesAndSeconds(currentTime)}
        </p>
        <p className={classNames(style.playerText, style.endTime)}>
          {millisToMinutesAndSeconds(songTime)}
        </p>
      </div>
    </div>
  );
};

export default Progress;
