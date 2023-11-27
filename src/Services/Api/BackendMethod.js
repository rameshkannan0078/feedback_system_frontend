import { GLOBAL } from "../Common/Lang/lang";



const API_BASE_URL = process.env.REACT_APP_API_URL;

const ACCESS_TOKEN=localStorage.getItem(GLOBAL.TOKEN);


const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

export const backendPost = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [GLOBAL.X_ACCESS_TOKEN]:ACCESS_TOKEN
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message || 'Failed to make POST request');
  }
};

export const backendGet = async (endpoint) => {

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        [GLOBAL.X_ACCESS_TOKEN]:ACCESS_TOKEN
      },
    });

    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message || 'Failed to make GET request');
  }
};

export const backendPatch = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        [GLOBAL.X_ACCESS_TOKEN]:ACCESS_TOKEN
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message || 'Failed to make PATCH request');
  }
};

export const backendDelete = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        [GLOBAL.X_ACCESS_TOKEN]:ACCESS_TOKEN
      },
    });

    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message || 'Failed to make DELETE request');
  }
};
