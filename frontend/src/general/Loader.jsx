import React from 'react';
import style from './Loader.module.css';
import MusicalNote from './MusicalNote';

const Loader = () => (
  <div className={style.loaderParent}>
    <div className={style.loaderContainer}>
      <div className={style.loader}>
        <MusicalNote />
      </div>
    </div>
  </div>
);

export default Loader;
