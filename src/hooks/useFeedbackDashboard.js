import { useState, useEffect } from 'react';
import { backendGet } from '../Services/Api/BackendMethod';
import ENDPOINTS from '../Services/Api/Endpoints';


export const getAllUserFeedback = async () => {
    try {
      const response = await backendGet(ENDPOINTS.FEEDBACK.dashboard);
      if(response.status){
        return response.result;
      }
    } catch (error) {
      throw error;
    }
  };


const useFeedbackDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const feedbackData = await getAllUserFeedback();
      setDashboardData(feedbackData);
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

  const fetchdashboardData=()=>{
    fetchData();
  }

  return { loading, dashboardData,fetchdashboardData, error };
};

export default useFeedbackDashboard;
