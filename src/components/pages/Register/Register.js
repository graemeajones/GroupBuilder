import { useState } from 'react';
import RegisterSignup from './RegisterSignup';
import RegisterConfirm from './RegisterConfirm';
import Signin from '../Signin';
import '../Page.scss';


function Register() {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSignupCompleted, setIsSignupCompleted] = useState(false);
  const [isConfirmCompleted, setIsConfirmCompleted] = useState(false);

  // Methods -------------------------------------
  const signupCompleted  = () => { setIsSignupCompleted(true); }
  const confirmCompleted = () => { setIsConfirmCompleted(true); }

  // View ----------------------------------------
  return (
    <>
      {
        !isSignupCompleted
          ? <RegisterSignup storeUser={setSelectedUser} stageCompleted={signupCompleted}/>
          : !isConfirmCompleted
            ? <RegisterConfirm user={selectedUser} stageCompleted={confirmCompleted}/>
            : <Signin />
      }
    </>
  )
}

export default Register;