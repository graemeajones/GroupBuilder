import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../ui/Card';
import './Page.scss';


function Signin() {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const refUsername = useRef();
  const refPassword = useRef();
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorAuth, setErrorAuth ] = useState(null);

  const [details, setDetails] = useState({ email: "", password: "" });
  const { authSignin } = useAuth();
  
  // Methods -------------------------------------
  const isValidEmail = (value) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value));

  const anyUsernameErrors = () => {
    if( (refUsername.current.value.length === 0) || !isValidEmail(refUsername.current.value) ) {
      setErrorUsername('You have not entered a valid email address');
      refUsername.current.focus();
      return true;
    }
    setErrorUsername(null);
    return false;
  }

  const anyPasswordErrors = () => {    
    if (refPassword.current.value.length < 8) {
      setErrorPassword('Your password should have at least eight characters');
      refPassword.current.focus();
      return true;
    }
    setErrorPassword(null);
    return false;
  }

  const handleSubmit = (e) => {
    // Initialisation
    e.preventDefault();
    setErrorUsername(null);
    setErrorPassword(null);
    setErrorAuth(null);

    // Form Validation and Authentication
    anyUsernameErrors() ||
      anyPasswordErrors() || 
        authSignin('g.jones@kingston.ac.uk', 'qwertyui', setErrorAuth);
  }

  const magicLogin = () => authSignin('g.jones@kingston.ac.uk', 'qwertyui', setErrorAuth);

  // View ----------------------------------------
  return (
    <Card>
      <section className="sectionSignIn">
        <h2>Sign In</h2>
        
        <form onSubmit={handleSubmit} className="authentication">
        
          <div className="formEntry">
            <label>KU email</label>
            <input  
              type="email"  
              ref={refUsername}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              value={details.email}
            />
          </div>
          <div className="formError">
            {
              errorUsername && <p className="errorMessage">{errorUsername}</p>
            }
          </div>
          <div className="formEntry">
            <label>Password</label>
            <input 
              type="password" 
              ref={refPassword}
              onChange={(e) => setDetails({ ...details, password: e.target.value })}
              value={details.password}
            />
          </div>
          <div className="formError">
            {
              errorPassword && <p className="errorMessage">{errorPassword}</p>
            }
          </div>
          <div className="formAction">
            <button name="signin" type="submit" className="primaryAction" >Sign in</button>
          </div>
          <div className="formError">
            {
              errorAuth && <p className="errorMessage">{errorAuth}</p>
            }
          </div>
          <div className="formAction">
            <button onClick={magicLogin} className="secondaryAction" >Magic Login!</button>
          </div>
        </form>

      </section>
    </Card>
  )
}

export default Signin;