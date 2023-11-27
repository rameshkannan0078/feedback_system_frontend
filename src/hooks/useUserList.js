import { useState, useEffect } from 'react';
import { backendGet } from '../Services/Api/BackendMethod';
import ENDPOINTS from '../Services/Api/Endpoints';


export const getAllUser = async () => {
    try {
      const response = await backendGet(ENDPOINTS.USER.get);
      if(response.status){
        return response.result;
      }
    } catch (error) {
      throw error;
    }
  };


const useAllUser = () => {
  const [loading, setLoading] = useState(true);
  const [userList, setuserList] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userData = await getAllUser();
      setuserList(userData);
      setError(null);
    } catch (error) {
      setError(error.message || 'Error fetching user');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAlluserList=()=>{
    fetchData();
  }

  return { loading, userList,fetchAlluserList, error };
};

export default useAllUser;
