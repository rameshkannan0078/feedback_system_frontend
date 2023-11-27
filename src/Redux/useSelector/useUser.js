import { useSelector } from 'react-redux';

export const useUserSelector = () => {
  const userData = useSelector((state) => state.user.userData);
  return { userData};
};

export const useLoginDetailsSelector = ()=>{
    const loginDetails = useSelector((state) => state.user.loginDetails);
    return { loginDetails};
}

