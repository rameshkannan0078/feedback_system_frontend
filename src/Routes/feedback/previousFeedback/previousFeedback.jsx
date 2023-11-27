import React from "react";
import BaCircularProgressIndicator from "../../../Components/BaCircularProgressIndicator/BaCircularProgressIndicator";
import Layout from "../../../Components/Layout/Layout";
import FeedbackCard from "../../../Components/FeedbackCard/FeedbackCard";
import BaNoDataFound from '../../../Components/BaNoDataFound/BaNoDataFound';
import useSingleUserFeedback from "../../../hooks/useSingleUserFeedback";


const PreviousFeedback = () => {
 const {loading,feedbackList,refetchFeedback}=useSingleUserFeedback();

  return (
    <Layout>
      <div className="container my-8 h-full flex flex-wrap -mx-4 overflow-auto">
        {loading ? (
          <BaCircularProgressIndicator />
        ) : (
          <div className="flex flex-wrap w-full">
            {feedbackList.length!==0 ? (
              feedbackList.map((feedback) => (
                <FeedbackCard key={feedback._id} feedback={feedback} callFeedbackData={refetchFeedback} />
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
