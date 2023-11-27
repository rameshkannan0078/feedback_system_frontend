import { useEffect, useState } from 'react';
import { backendPost } from '../Services/Api/BackendMethod';
import ENDPOINTS from '../Services/Api/Endpoints';
import { useDispatch } from 'react-redux';
import { FEEDBACK_DISPATCH } from '../Redux/Actions/feedbackAction';
import { GLOBAL } from '../Services/Common/Lang/lang';

const useSingleUserFeedback = () => {

  
  const [feedbackList, setFeedbackList] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const jsonData = JSON.parse(localStorage.getItem(GLOBAL.USER_CREDENTIALS));

      if (jsonData) {
        const customerId = jsonData.customerId;
        const data = await backendPost(ENDPOINTS.FEEDBACK.single, { customerId });

        if (data.status) {
          setFeedbackList(data.result);
          dispatch(FEEDBACK_DISPATCH.setFeedbackDetails(data.result));
        } else {
          setError(data.message || 'Error fetching feedback');
        }
      }
    } catch (error) {
      setError(error.message || 'Error fetching feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetchFeedback = () => {
    fetchFeedback();
  };

  return { loading, feedbackList, error, refetchFeedback };
};

export default useSingleUserFeedback;
