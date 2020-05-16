import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './styles/landingPage.module.css';
import { login } from '../../store/profile/profileActions';
import Wave from '../../general/Wave';
import AppName from '../../general/AppName';
import text from '../../general/text';

const LandingPage = () => {
  return (
    <div className={style.page}>
      <div className={style.waveContainer}>
        <div className={classNames(style.wave, style.outerWave)}>
          <Wave fill="#7C4D0F" />
        </div>
        <div className={classNames(style.wave, style.middleWave)}>
          <Wave fill="#CB7E17" />
        </div>
        <div className={classNames(style.wave, style.innerWave)}>
          <Wave fill="#f6a333" />
        </div>
      </div>
      <div className={style.contentContainer}>
        <div className={style.content}>
          <div className={style.title}>
            <AppName />
          </div>
          <p className={style.innerText}>{text.frontPage.description}</p>
          <div className={style.buttonContainer}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button size="large" color="primary" className={style.button}>
                {text.frontPage.buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.profileReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  loginSpotify: bindActionCreators(login, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
