import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo } from '../../../../store/profile/profileActions';
import MusicPlayer from './musicPlayer';

const MusicPlayerContainer = props => {
  const { userInfo, accessToken, loading } = props;

  useEffect(() => {
    userInfo();
  }, []);

  return loading || accessToken === '' ? (
    <div> Loading... </div>
  ) : (
    <div>
      <MusicPlayer accessToken={accessToken} />
    </div>
  );
};

const mapStateToProps = state => ({
  accessToken: state.profileReducer.user.accessToken,
  loading: state.profileReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  userInfo: bindActionCreators(getUserInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerContainer);
