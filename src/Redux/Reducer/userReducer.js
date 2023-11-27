// userReducer.js
import  {USER_DETAILS}  from '../Actions/userAction';

const initialState = {
  userDetails: null,
  loginDetails: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    case USER_DETAILS.SET_LOGIN_DETAILS:
      return {
        ...state,
        loginDetails: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
