import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo } from './store/profile/profileActions';

const Test = () => {
  const seconds = 1000;
  const [timeLeft, setTimeLeft] = useState(seconds);

  console.log(timeLeft);
  useEffect(() => {
    // exit early when we reach 0
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, []);

  return (
    <div>
      <h1>{timeLeft}</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  accessToken: state.profileReducer.token,
  loading: state.profileReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  userInfo: bindActionCreators(getUserInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
