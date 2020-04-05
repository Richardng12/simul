import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo } from './store/profile/profileActions';

const Test = props => {
  const { userInfo } = props;
  return (
    <button onClick={() => userInfo()} type="button">
      Hello
    </button>
  );
};

// const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  userInfo: bindActionCreators(getUserInfo, dispatch),
});
export default connect(null, mapDispatchToProps)(Test);
