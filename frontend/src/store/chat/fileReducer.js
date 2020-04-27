import { actionTypes } from './chatActions';

// not used
const fileReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.postFile:
      return {
        ...state,
      };
    case actionTypes.postFile_success:
      return {
        ...state,
        file: action.data,
      };
    case actionTypes.postFile_fail:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};

export default fileReducer;
