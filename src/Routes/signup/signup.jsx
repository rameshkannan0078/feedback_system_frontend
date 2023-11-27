import React, { useState } from "react";
import { BaInputField } from "../../Components/BaInputField/BaInputField";
import { BaLabel } from "../../Components/BaLabel/BaLabel";
import { useNavigate } from "react-router-dom";

import { validateForm } from "../../Services/Validator/validator";
import { backendPost } from "../../Services/Api/BackendMethod";
import ENDPOINTS from "../../Services/Api/Endpoints";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignup = async () => {
    const error = validateForm(formData);
    if (error) {
      setErrorMsg(error);
      setTimeout(() => {
        setErrorMsg("");
      }, [5000]);
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setErrorMsg(`The password doesnt match *`);
      setTimeout(() => {
        setErrorMsg("");
      }, [5000]);
      return;
    }
    const options = {
      customerName: formData.username,
      customerEmail: formData.email,
      customerPassword: formData.password,
      customerDateOfBirth: formData.dob,
    };
    const data = await backendPost(ENDPOINTS.LOGIN.signup, options);
    if(data.status){
      toast.success('Account has been created successfully');
      navigate('/signin');
    }
    else{
      toast.error(data.message)
    }

  };

  const handlePage = (path) => {
    navigate(path);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-6 text-center">Signup</h1>

        <BaLabel htmlFor="username">Username</BaLabel>
        <BaInputField
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
        />

        <BaLabel htmlFor="email">Email</BaLabel>
        <BaInputField
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <BaLabel htmlFor="password">Password</BaLabel>
        <BaInputField
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <BaLabel htmlFor="confirmPassword">Confirm Password</BaLabel>
        <BaInputField
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <BaLabel htmlFor="dob">Date of Birth</BaLabel>
        <BaInputField
          type="date"
          name="dob"
          id="dob"
          placeholder="Enter your Date of Birth"
          value={formData.dob}
          onChange={handleChange}
        />

        {errorMsg && (
          <div className="text-red-500 font-semibold mb-4">{errorMsg}</div>
        )}

        <button
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700 focus:outline-none"
          onClick={handleSignup}
        >
          Signup
        </button>
        <div className="flex justify-center">
          <div className="flex flex-row space-x-3 font-semibold text-center text-gray-600 mt-4">
            <p className="mb-2">Already have an account?</p>
            <div
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => {
                handlePage("/signin");
              }}
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
