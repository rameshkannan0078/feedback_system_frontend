import React, { useState } from "react";
import { Star, Edit, Trash2 } from "react-feather";
import EditFeedbackModal from "../FeedbackModalCard/FeedbackModalCard";
import { backendDelete, backendPatch } from "../../Services/Api/BackendMethod";
import ENDPOINTS from "../../Services/Api/Endpoints";
import { toast } from "react-toastify";

const FeedbackCard = ({ feedback,callFeedbackData }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSave = async (editedFeedback) => {
    const data=await backendPatch(ENDPOINTS.FEEDBACK.update,editedFeedback)
    if(data.status){
      toast.success('Feedback has been updated successfully !');
      callFeedbackData();
    }
    else{
      toast.error(data.message);
    }
  };

  const handleDelete = async () => {
    const data = await backendDelete(`${ENDPOINTS.FEEDBACK.delete}/${feedback._id}`);
    if(data.status){
     toast.success('Feedback has deleted successfully!');
     callFeedbackData();
    }
    else{
      toast.error('Unable to delete the feedback');
    }
  };

  const renderStars = () => {
    return (
      <div className="flex items-center mb-2">
        <span className="text-gray-600 mr-2">Rating:</span>
        <div className="flex space-x-1 ">
          {[1, 2, 3, 4, 5].map((index) => (
            <Star
              key={index}
              size={16}
              color={index <= feedback.rating ? "#FFD700" : "#D3D3D3"}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-4 ">
      <div className="bg-gray-100 flex flex-col h-full p-6 mb-4 rounded-lg shadow-md">
        <div className="ml-auto mb-4">
          <p className="text-gray-600 font-bold">{` ${formatDate(
            feedback.date
          )}`}</p>
        </div>
        <h2 className="text-2xl font-bold mb-4">{feedback.customerName}</h2>
        <p className="text-gray-600 mb-2">{`Feedback Type: ${feedback.feedbackType}`}</p>
        <p className="text-gray-600 mb-2">{`Subject: ${feedback.feedbackSubject}`}</p>
        {renderStars()}
        <p className="text-gray-800 flex-grow">{feedback.feedback}</p>
        <div className="flex flex-row space-x-3 ml-auto items-center">
          <div
            className="cursor-pointer text-blue-500 flex items-center bg-blue-100 rounded p-2"
            onClick={handleEditClick}
          >
            <Edit size={20} />
            <span className="ml-1">Edit</span>
          </div>
          <div className="cursor-pointer text-red-500 flex items-center bg-red-100 rounded p-2" onClick={handleDelete}>
            <Trash2 size={20} />
            <span className="ml-1">Delete</span>
          </div>
        </div>
      </div>
      <EditFeedbackModal
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        feedback={feedback}
        onEdit={handleEditSave}
      />
    </div>
  );
};

export default FeedbackCard;
