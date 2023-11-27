
export const FEEDBACK_DETAILS = {
  SET_FEEDBACK_DETAILS:'SET_FEEDBACK_DETAILS'
};

export const setFeedbackDetails = (feedbackDetails) => ({
  type: FEEDBACK_DETAILS.SET_FEEDBACK_DETAILS,
  payload: feedbackDetails,
});
