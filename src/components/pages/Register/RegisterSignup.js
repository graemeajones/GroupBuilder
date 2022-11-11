import { useRef, useState, useEffect } from 'react';
import Card from '../../ui/Card';
import { dataRequest } from '../../api/dataAPI';
import '../Page.scss';


function RegisterSignup({ storeUser, stageCompleted }) {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const selectedUserIndex = useRef(-1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [unregisteredUsers, setUnregisteredUsers] = useState(null);

  // Fetch the list of unregistered users for the view's select input
  useEffect(() => { fetchUsers() }, []); // Run once

  // Methods -------------------------------------
  const fetchUsers = async () => {
    const outcome = await dataRequest('Users');
    if ( outcome.success && (outcome.response.length > 0) )
      setUnregisteredUsers(outcome.response);
  }

  const anyValidationErrors = (id) => {
    if (id === -1) {
      setErrorMessage('You have not selected a name!');
      return true;
    }
    else {
      setErrorMessage(null);
      return false;
    }
  }

  const handleChange = (event) => {
    // Input Validation ..........................
    selectedUserIndex.current = parseInt(event.target.value)-1;
    anyValidationErrors(selectedUserIndex.current);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form Validation ...........................
    const anyErrors = anyValidationErrors(selectedUserIndex.current);

    // Handle Submit .............................
    if (!anyErrors) {
      // Store selected user object
      storeUser( unregisteredUsers[selectedUserIndex.current] );
      console.log("Email confirmation code to user");
      stageCompleted();
    }
  }

  // View ----------------------------------------
  return (
    <Card>
      <section>
        <h2>Register account</h2>

        <form onSubmit={handleSubmit} className="authentication">

          <div className="formInstructions">
            <p>
              An account has been set up for you on GroupBuilder
              but you need to register this account to use it. &nbsp;
              <span className="advice">Find yourself in the list
                below and then click the &nbsp;
                <span className="action">Register</span> button.</span>
            </p>
          </div>

          <div className="formEntry">
            {
              console.log("unregisteredUsers: "+JSON.stringify(unregisteredUsers))
            }
            <select name="user" onChange={handleChange}>
              <option value='0'>Select your name ...</option>
              {
                unregisteredUsers &&
                  unregisteredUsers.map((user,index) => {
                    return <option key={user.UserID} value={index+1}>{user.UserFirstname} {user.UserLastname}</option>;
                  })
              }
            </select>
          </div>
          <div className="formError">
            {
              errorMessage && <p className="errorMessage">{errorMessage}</p>
            }
          </div>
          <div className="formAction">
            <button name="register" type="submit" className="primaryAction" >Register</button>
          </div>
        </form>

      </section>
    </Card>
  )
}

export default RegisterSignup;