import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../util/cookieUtils';

const TncGuard = ({ children }) => {
  const location = useLocation();
  const tncAccepted = getCookie('tncAccepted') === 'true';
  
  // Allow access to TNC, login, and signup pages without TNC acceptance
  const publicPaths = ['/tnc', '/login', '/signup'];
  const isPublicPath = publicPaths.includes(location.pathname);
  
  // If TNC not accepted and trying to access protected routes, redirect to TNC
  if (!tncAccepted && !isPublicPath) {
    return <Navigate to="/tnc" replace />;
  }
  
  return children;
};

export default TncGuard;
