import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo } from './store/profile/profileActions';
import SmallLoader from './general/SmallLoader';

const Test = () => {
  return <SmallLoader />;
};

const mapStateToProps = state => ({
  accessToken: state.profileReducer.token,
  loading: state.profileReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  userInfo: bindActionCreators(getUserInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
