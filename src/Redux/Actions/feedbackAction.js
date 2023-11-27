
export const FEEDBACK_DETAILS = {
  SET_FEEDBACK_DETAILS:'SET_FEEDBACK_DETAILS'
};
 const setFeedbackDetails = (feedbackDetails) => ({
  type: FEEDBACK_DETAILS.SET_FEEDBACK_DETAILS,
  payload: feedbackDetails,
});


export const FEEDBACK_DISPATCH={
  setFeedbackDetails
}