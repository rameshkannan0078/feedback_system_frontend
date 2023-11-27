import React, {  useEffect, useState } from "react";
import { backendPost } from "../../../Services/Api/BackendMethod";
import ENDPOINTS from "../../../Services/Api/Endpoints";
import { GLOBAL } from "../../../Services/Common/Lang/lang";
import BaCircularProgressIndicator from "../../../Components/BaCircularProgressIndicator/BaCircularProgressIndicator";
import Layout from "../../../Components/Layout/Layout";
import FeedbackCard from "../../../Components/FeedbackCard/FeedbackCard";
import BaNoDataFound from '../../../Components/BaNoDataFound/BaNoDataFound';
import 'react-toastify/dist/ReactToastify.css';



const PreviousFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    const jsonData = JSON.parse(
      localStorage.getItem(GLOBAL.USER_CREDENTIALS)
    );
    if (jsonData) {
      const customerId = jsonData.customerId;

      const data = await backendPost(ENDPOINTS.FEEDBACK.single, { customerId });
      if (data.status) {
        setFeedbackList(data.result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <Layout>
      <div className="container my-8 h-full flex flex-wrap -mx-4 overflow-auto">
        {loading ? (
          <BaCircularProgressIndicator />
        ) : (
          <div className="flex flex-wrap w-full">
            {feedbackList.length!==0 ? (
              feedbackList.map((feedback) => (
                <FeedbackCard key={feedback._id} feedback={feedback} callFeedbackData={fetchFeedback} />
              ))
            ) : (
              <BaNoDataFound/>            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PreviousFeedback;
