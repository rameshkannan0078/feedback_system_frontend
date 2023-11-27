
import { FEEDBACK_DETAILS } from '../Actions/feedbackAction';

const initialState = {
  feedbackDetails: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACK_DETAILS.SET_FEEDBACK_DETAILS:
      return {
        ...state,
        feedbackDetails: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
