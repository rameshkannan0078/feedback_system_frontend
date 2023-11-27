// userAction.js
export const USER_DETAILS = {
    SET_USER_DETAILS: 'SET_USER_DETAILS',
    SET_LOGIN_DETAILS: 'SET_LOGIN_DETAILS',
};

  
 const setUserDetails = (userDetails) => ({
    type: USER_DETAILS.SET_USER_DETAILS,
    payload: userDetails,
  });
  
 const setLoginDetails = (loginDetails) => ({
    type: USER_DETAILS.SET_LOGIN_DETAILS,
    payload: loginDetails,
  });
  
 export const USER_DISPATCH={
    setUserDetails,setLoginDetails
 } 