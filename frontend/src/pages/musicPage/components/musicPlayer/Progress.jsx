import React, { useEffect, useState } from 'react';
import style from './musicPlayer.module.css';

const Progress = props => {
  const { songTime, setCurrentTime, currentTime } = props;
  const [musicProgress, setMusicProgress] = useState(0);

  useEffect(() => {
    if (songTime === 0) return;
    const interval = setInterval(() => {
      setCurrentTime(currentTime + 10);
      const percent = (currentTime / songTime) * 100;
      setMusicProgress(percent);
    }, 10);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
  }, [currentTime, songTime]);

  const millisToMinutesAndSeconds = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // const startTimer = useCallback(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(currentTime + 1000);
  //     const percent = (currentTime / songTime) * 100;
  //     setMusicProgress(percent);
  //   }, 1000);
  //
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentTime]);
  return (
    <div className={style.progress}>
      <div className={style.loader} style={{ width: `${musicProgress}%` }} />
      <p>{millisToMinutesAndSeconds(currentTime)}</p>
      <p>{millisToMinutesAndSeconds(songTime)}</p>
    </div>
  );
};

export default Progress;
