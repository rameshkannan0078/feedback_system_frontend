import { Navigate } from 'react-router-dom';
import { useLoginDetailsSelector } from '../../Redux/useSelector/useUser';
import { jwtDecode } from "jwt-decode";
import { GLOBAL } from '../../Services/Common/Lang/lang';

const localItem = JSON.parse(localStorage.getItem(GLOBAL.USER_CREDENTIALS));
const localToken = localStorage.getItem(GLOBAL.TOKEN);

export function PrivateRoute({ children }) {
    const { token } = useLoginDetailsSelector()?.loginDetails || {};

    if (!token || isTokenExpired(token)) {
        if (localToken && !isTokenExpired(localToken)) {
            return children;
        }
        return <Navigate to="/" />;
    }

    return children;
}

export function AdminPrivateRoute({ children }) {
    const { token, result } = useLoginDetailsSelector()?.loginDetails || {};

    if (!token || (result && result.type !== 'ADMIN') || isTokenExpired(token)) {
        if (localToken && localItem && !isTokenExpired(localToken)) {
            return children;
        }
        return <Navigate to="/" />;
    }

    return children;
}

function isTokenExpired(token) {
    try {
        const decodedToken = jwtDecode(token);

        if (!decodedToken || !decodedToken.exp) {
            return true;
        }

        const expirationDate = new Date(decodedToken.exp * 1000);
        const currentTimestamp = new Date();

        return currentTimestamp > expirationDate;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
}
