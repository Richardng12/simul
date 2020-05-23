import React from 'react';
import MusicNoteI from './MusicNoteI';
import style from './SmallLoader.module.css';

const SmallLoader = () => (
  <div className={style.loaderParent}>
    <div className={style.loaderContainer}>
      <div className={style.loader}>
        <MusicNoteI />
      </div>
    </div>
  </div>
);

export default SmallLoader;
