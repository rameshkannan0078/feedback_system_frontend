import { useState, useEffect } from 'react';
import { backendGet } from '../Services/Api/BackendMethod';
import ENDPOINTS from '../Services/Api/Endpoints';


export const getAllUserFeedback = async () => {
    try {
      const response = await backendGet(ENDPOINTS.FEEDBACK.get);
      if(response.status){
        return response.result;
      }
    } catch (error) {
      throw error;
    }
  };


const useAllUserFeedback = () => {
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const feedbackData = await getAllUserFeedback();
      setFeedbackList(feedbackData);
      setError(null);
    } catch (error) {
      setError(error.message || 'Error fetching feedback');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
  

    fetchData();
  }, []);

  const fetchFeedbackList=()=>{
    fetchData();
  }

  return { loading, feedbackList,fetchFeedbackList, error };
};

export default useAllUserFeedback;
