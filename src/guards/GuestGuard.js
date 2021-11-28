import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import {useAuth} from '../contexts/useAuth';
// routes
import { PATH_PAGE } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isSignedIn } = useAuth();

  if (isSignedIn()) {
    return <Navigate to={PATH_PAGE.root} />;
  }

  return <>{children}</>;
}
