import React, { useEffect, useState } from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import { BaLabel } from "../BaLabel/BaLabel";
import { BaInputField } from "../BaInputField/BaInputField";
import { Star, X } from "react-feather";
import { feedbackTypeOptions } from "../../Services/Common/OptionTypes/types";
import BaSelect from "../BaSelect/BaSelect";


const EditFeedbackModal = ({ isOpen, onClose, feedback, onEdit }) => {

  const [editedFeedback, setEditedFeedback] = useState({});

  useEffect(()=>{
    setEditedFeedback(feedback);
  },[feedback])

  const handleChange = (field, value) => {
    setEditedFeedback({ ...editedFeedback, [field]: value });
  };

  const handleRatingChange = (newRating) => {
    setEditedFeedback({ ...editedFeedback, rating: newRating });
  };

  const handleSave = () => {
    onEdit(editedFeedback);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className=" mt-28 w-2/5  mx-auto"
    >
      <Fade in={isOpen}>
        <div className="bg-white p-6 rounded-md">
          <div className="flex flex-row border-b-2 mb-4">
            <h2 className="text-2xl font-bold mb-4">Edit Feedback</h2>
            <div
              className="ml-auto cursor-pointer hover:text-red-500"
              onClick={() => {
                onClose();
              }}
            >
              <X size={28} />
            </div>
          </div>
          <div className="mb-4 flex flex-col space-y-2">
            <BaLabel htmlFor="feedbackType">Feedback Type</BaLabel>
            
          <BaSelect
            id="feedbackType"
            value={editedFeedback.feedbackType}
            onChange={(value) => handleChange('feedbackType', value)}
            options={feedbackTypeOptions}
          />


          </div>
          <div className="mb-4 flex flex-col space-y-2">
            <BaLabel htmlFor="subject">Subject</BaLabel>
            <BaInputField
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter subject"
              value={editedFeedback.feedbackSubject}
              onChange={(e) => handleChange("feedbackSubject", e.target.value)}
            />
          </div>
          <div className="mb-4 flex flex-col space-y-2">
            <BaLabel htmlFor="rating">Rating</BaLabel>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  color={star <= editedFeedback.rating ? "#FFD700" : "#D3D3D3"}
                  className="cursor-pointer"
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
          </div>

          <div className="mb-4 flex flex-col space-y-2">
            <BaLabel htmlFor="feedback">Feedback</BaLabel>

            <textarea
              className="w-full p-4 border border-gray-300 rounded mb-4"
              placeholder="Type your feedback here..."
              value={editedFeedback.feedback}
              onChange={(e) => handleChange("feedback", e.target.value)}
            />
          </div>

          <div className=" mx-auto flex flex-row space-x-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={handleSave}
            >
              Update
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditFeedbackModal;
