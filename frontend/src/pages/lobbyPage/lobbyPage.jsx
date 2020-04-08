import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimulAppBar from '../musicPage/components/appBar';
import { getUserInfo } from '../../store/profile/profileActions';

const LobbyPage = props => {
  const { loading, userInfo } = props;

  useEffect(() => {
    userInfo();
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div>
      <SimulAppBar />
      <p>This is the lobbies Page</p>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.profileReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  userInfo: bindActionCreators(getUserInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);
