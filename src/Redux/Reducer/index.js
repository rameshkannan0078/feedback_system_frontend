
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import feedbackReducer from './feedbackReducer';

const rootReducer = combineReducers({
  user: userReducer,    
  feedback:feedbackReducer
});

export default rootReducer;
