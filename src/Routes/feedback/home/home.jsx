import React, { useState } from 'react';
import Layout from '../../../Components/Layout/Layout';
import { Star } from 'react-feather';
import BaSelect from '../../../Components/BaSelect/BaSelect'; // Import the BaSelect component
import { backendPost } from '../../../Services/Api/BackendMethod';
import ENDPOINTS from '../../../Services/Api/Endpoints';
import { GLOBAL } from '../../../Services/Common/Lang/lang';
import { toast } from 'react-toastify';
import { feedbackTypeOptions  } from '../../../Services/Common/OptionTypes/types';
import { validateForm } from "../../../Services/Validator/validator";


const HomePage = () => {
  
  const [errorMsg,setErrorMsg]=useState('');
  const [formData, setFormData] = useState({
    feedbackType: '',
    subject: '',
    message: '',
    rating: 0,
  });

  const resetForm = () => {
    setFormData({
      feedbackType: '',
      subject: '',
      message: '',
      rating: 0,
    });
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleRatingChange = (newRating) => {
    handleFieldChange('rating', newRating);
  };

  const handleSubmit = async () => {

   const error = validateForm(formData);
    if (error) {
      setErrorMsg(error);
      setTimeout(()=>{      setErrorMsg('')},5000)
      return;
    }

    const customerData=JSON.parse(localStorage.getItem(GLOBAL.USER_CREDENTIALS));
    const options={
      customerId:customerData.customerId,
      customerName:customerData.customerName,
      feedbackType:formData.feedbackType,
      feedbackSubject:formData.subject,
      feedback:formData.message,
      rating:formData.rating
    }

    const data=await backendPost(ENDPOINTS.FEEDBACK.add,options);
    if(data.status){
      toast.success('Feedback has been submitted successfully');

      resetForm();
    }
    else{
      toast.error('Unable to submit the feedback');
    }
  
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Provide Your Feedback</h2>
        <div className="w-1/2">

          <BaSelect
            id="feedbackType"
            label="Feedback Type"
            value={formData.feedbackType}
            onChange={(value) => handleFieldChange('feedbackType', value)}
            options={feedbackTypeOptions}
          />

          <div className="mb-4">
            <label htmlFor="subject" className="text-lg font-semibold mb-2">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter the subject"
              value={formData.subject}
              onChange={(e) => handleFieldChange('subject', e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="text-lg font-semibold mb-2">
              Description:
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded mb-4"
              placeholder="Type your feedback here..."
              value={formData.message}
              onChange={(e) => handleFieldChange('message', e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                color={star <= formData.rating ? '#FFD700' : '#D3D3D3'}
                className="cursor-pointer"
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
          <div>
          {errorMsg && <div className='text-red-500 mt-4 mb-4'>{errorMsg}</div>}
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-300 text-gray-700 w-28 px-4 py-2 rounded mr-2 hover:bg-gray-400 focus:outline-none"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 focus:outline-none"
   
              onClick={handleSubmit}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
