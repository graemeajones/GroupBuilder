import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, ...rest }) {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const { authUser } = useAuth();

  // Methods -------------------------------------
  // Prepare view --------------------------------
  // View ----------------------------------------
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser
          ? (children)
          : (<Redirect to={{ pathname: '/signin', state: { from: location } }} />)
      }
    />
  );
}

export default ProtectedRoute;

// Source: https://www.youtube.com/watch?v=PKwu15ldZ7k and https://reactrouter.com/web/example/auth-workflow