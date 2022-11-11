import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../ui/Card';
import '../Page.scss';


function RegisterConfirm({user,stageCompleted}) {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const refConfirmCode = useRef();
  const refPasswordOne = useRef();
  const refPasswordTwo = useRef();
  const [errorConfirmCode, setErrorConfirmCode] = useState(null);
  const [errorPasswordOne, setErrorPasswordOne] = useState(null);
  const [errorPasswordTwo, setErrorPasswordTwo] = useState(null);
  const [errorAuth, setErrorAuth ] = useState(null);
  const { authConfirmationCode, authPasswordUpdate } = useAuth();

  // Methods -------------------------------------
  const anyConfirmCodeErrors = () => {
    if (refConfirmCode.current.value.length !== 6) {
      setErrorConfirmCode('The Confirmation Code emailed to you has six numerals');
      refConfirmCode.current.focus();
      return true;
    }
    setErrorConfirmCode(null);
    return false;
  }

  const anyPasswordOneErrors = () => {    
    if (refPasswordOne.current.value.length < 8) {
      setErrorPasswordOne('Your password should have at least eight characters');
      refPasswordOne.current.focus();
      return true;
    }
    setErrorPasswordOne(null);
    return false;
  }

  const anyPasswordTwoErrors = () => {    
    if (refPasswordOne.current.value !== refPasswordTwo.current.value) {
      setErrorPasswordTwo('Your second password value is not the same as the first');
      refPasswordTwo.current.focus();
      return true;
    }
    setErrorPasswordTwo(null);
    return false;
  }

  const handleSubmit = async (event) => {
    // Initialisation
    event.preventDefault();
    setErrorConfirmCode(null);
    setErrorPasswordOne(null);
    setErrorPasswordTwo(null);
    setErrorAuth(null);
    
    // Form Validation and Authentication
    const anyErrors =
      anyConfirmCodeErrors() ||         // Any errors?
        anyPasswordOneErrors() ||       // Any errors?
          anyPasswordTwoErrors() ||     // Any errors?
            !authConfirmationCode(      // NOT Authenticates?
              user,
              refConfirmCode.current.value,
              setErrorAuth // enable authentication to report error
            );
    
    // Update account credentials
    if ( !anyErrors ) {
      const response = await authPasswordUpdate(
        user,
        refPasswordOne.current.value,
        setErrorAuth
      );
// THIS IS NOT YET CORRECT - WHAT DOES response RETURN?
      if ( response ) stageCompleted();
    }
  }

  const magicConfirm = () => authPasswordUpdate(user, 'qwertyui', setErrorAuth);

  // View ----------------------------------------
  const userName = user.UserFirstname + ' ' + user.UserLastname;

  return (
    <Card>
      <section>
        <h2>Confirm account</h2>
        <h3>{userName}</h3>

        <form onSubmit={handleSubmit} className="authentication">

          <div className="formInstructions">
            <p>
              A confirmation code has been sent to your university
              email account. You should enter this code below,
              choose a suitable password, and then click the&nbsp;
              <span className="action">Confirm</span> button.&nbsp; 
              <span className="advice">(As this is not a university
                system, you should NOT use your university password.)
              </span>
            </p>
          </div>

          <p className="inconspicuous">Your confirmation code is {user.UserPassword}</p>

          <div className="formEntry">
            <label>Enter your confirmation code</label>
            <input
              ref={refConfirmCode}
              type="text"
              onChange={(event) => { refConfirmCode.current.value = event.target.value.trim() }}
            />
          </div>
          <div className="formError">
            {
              errorConfirmCode && <p className="errorMessage">{errorConfirmCode}</p>
            }
          </div>

          <div className="formEntry">
            <label>Choose a suitable password</label>
            <input
              ref={refPasswordOne}
              type="password"
              onChange={(event) => { refPasswordOne.current.value = event.target.value.trim() }}
            />
          </div>
          <div className="formError">
            {
              errorPasswordOne && <p className="errorMessage">{errorPasswordOne}</p>
            }
          </div>

          <div className="formEntry">
            <label>Repeat this password</label>
            <input
              ref={refPasswordTwo}
              type="password"
              onChange={(event) => { refPasswordTwo.current.value = event.target.value.trim() }}
            />
          </div>
          <div className="formError">
            {
              errorPasswordTwo && <p className="errorMessage">{errorPasswordTwo}</p>
            }
          </div>
          <div className="formAction">
            <button name="confirm" type="submit" className="primaryAction" >Confirm</button>
          </div>
          <div className="formError">
            {
              errorAuth && <p className="errorMessage">{errorAuth}</p>
            }
          </div>
          <div className="formAction">
            <button onClick={magicConfirm} className="secondaryAction" >Magic Confirm!</button>
          </div>
        </form>
      </section>
    </Card>
  )
}

export default RegisterConfirm;