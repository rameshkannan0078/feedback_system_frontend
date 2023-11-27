  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import {  backendPost } from "../../Services/Api/BackendMethod";
  import ENDPOINTS from "../../Services/Api/Endpoints";
  import { GLOBAL } from "../../Services/Common/Lang/lang";
  import { validateForm } from "../../Services/Validator/validator";
  import { useDispatch } from "react-redux";
  import {  USER_DISPATCH, setUserDetails } from "../../Redux/Actions/userAction";

  const Signin = () => {

    const dispatch=useDispatch();
    
    const [errorMsg,setErrorMsg]=useState('');
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };

    const handlePage = (path) => {
      navigate(path);
    };


    const handleLogin=async ()=>{
      const error = validateForm(formData);
      if (error) {
        setErrorMsg(error);
        return;
      }

      const options={
        customerEmail:formData.username,
        customerPassword:formData.password
      };
      const login=await backendPost(ENDPOINTS.LOGIN.signin,options);
      if(login.status){
        localStorage.setItem(GLOBAL.TOKEN,login.token);
        localStorage.setItem(GLOBAL.USER_CREDENTIALS,JSON.stringify(login.result));
        dispatch(USER_DISPATCH.setLoginDetails(login));
        navigate('/homepage');
      }
      else{
        setErrorMsg(login.message);
        setTimeout(()=>{
        setErrorMsg();
        },5000)
      }
    }




    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
        {errorMsg && <div className="text-red-500  mb-3">{errorMsg}</div>}
          </div>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            onClick={() => {handleLogin()}}
          >
            Login
          </button>

          <div className="flex justify-center font-semibold">
            <div className="text-center text-gray-600 mt-4 flex flex-row space-x-2">
              <p className="mb-2">Ready to join us?</p>
              <div
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  handlePage("/signup");
                }}
              >
                Sign Up
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Signin;
