import React from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../../Assets/welcome_asset.png';
import feedbackLogo from '../../Assets/feedback_logo.png';
import { ArrowRight } from 'react-feather';

const WelcomeComponent = () => {
  const navigate = useNavigate();



  const handlePage = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen p-8">
      <div className="md:flex-shrink-0 md:w-1/2 mb-4 md:mb-0">
        <div className="rounded-lg overflow-hidden shadow-lg bg-white">
          <img src={welcomeImage} className="w-full h-full object-cover" alt="Welcome" />
        </div>
      </div>

      <div className="flex flex-col md:w-1/2 p-16 space-y-6">
        <div>
          <div className="w-56 h-56 ">
            <img src={feedbackLogo} className="w-full h-full" alt="Feedback Logo" />
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to Feedback
          </h1>
          <p className="text-xl md:text-xl lg:text-2xl">
            Explore and share your thoughts with us! We value your feedback.
          </p>
          <div
            onClick={() => handlePage('/signin')}
            className="hover:cursor-pointer h-16 w-full md:w-1/4 flex items-center justify-center bg-blue-700 text-white text-xl font-semibold rounded-full"
          >
            <div className="mr-2">Get Started</div>
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;
