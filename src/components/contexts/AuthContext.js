import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { dataRequest as updateUser } from '../api/dataAPI';


const AuthContext = createContext();
export const useAuth = () => { return useContext(AuthContext); }

function AuthProvider({children}) {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const [authUser, setAuthUser] = useState(null);
  const history = useHistory();

  // Methods -------------------------------------

  // Use during registration ...
  const authConfirmationCode = (user, confirmationCode, captureError) => {
    const correctConfirmationCode = '234567';
    if (confirmationCode !== correctConfirmationCode) {
      captureError('The supplied Contribution Log does not belong to this user');
      return false;
    }
    return true; // Hurrah!
  };

  // Update password (or Signup)
  const authPasswordUpdate = async (user, password, captureError) => {
    // Update password on authentication server
    const endpoint = "Users/" + user.UserID;
    const method = "PUT";
    const userObj = JSON.stringify({ ...user, UserPassword: password, UserRegistered: 1 });
    const data = await updateUser(endpoint, method, userObj);
    if (data) {
      captureError('There was a problem updating your password; try clicking Confirm again');
      return false;
    }
    return true; // Hurrah!
  };
    
  // Login
  const authSignin = (email, password, captureError) => {
    // Authenticate user
    // ... recover user object from authAPI 
    const user = { UserID: 1, UserFirstname: 'Graeme', UserLastName: 'Jones', UserPassword: 'qwertyui' };
    // If successful ...
    setAuthUser(user);
      history.push('/groups');
      return true; // Hurrah!
    // Else
    // return false;
  };

  // Logout
  const authSignout = () => {
    setAuthUser(null);
    history.push('/');
  }

  // Prepare view --------------------------------
  const authObject = {
    authUser,
    authConfirmationCode,
    authPasswordUpdate,
    authSignin,
    authSignout
  };

  // View ----------------------------------------
  return (
    <AuthContext.Provider value={authObject}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
