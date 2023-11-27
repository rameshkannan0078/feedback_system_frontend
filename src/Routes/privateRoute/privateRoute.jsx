import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLoginDetailsSelector } from '../../Redux/useSelector/useUser';
import { GLOBAL } from '../../Services/Common/Lang/lang';


export default function PrivateRoute({ children }) {
    const data=localStorage.getItem(GLOBAL.TOKEN);
    const userDetails=useLoginDetailsSelector();
    if (!userDetails?.loginDetails?.token) {
        return <Navigate to="/" />
    }
    return children;
}