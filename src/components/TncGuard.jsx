import { Navigate, useLocation } from 'react-router-dom';

const TncGuard = ({ children }) => {
  const location = useLocation();
  const tncAccepted = localStorage.getItem('tncAccepted') === 'true';
  
  // If TNC not accepted and trying to access /bot routes (except /bot/tnc itself)
  if (!tncAccepted && location.pathname.startsWith('/bot') && location.pathname !== '/bot/tnc' && location.pathname !== '/tnc') {
    return <Navigate to="/bot/tnc" replace />;
  }
  
  return children;
};

export default TncGuard;

