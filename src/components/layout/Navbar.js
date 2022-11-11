import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.scss';


function Navbar() {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const { authUser, authSignout } = useAuth();
  
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <nav>
      {
        !authUser
          ?
          (
            <>
              <div className="navItem">
                <NavLink to={'/'} activeClassName="navSelected" exact>Home</NavLink>
              </div>
              <div className="navItem">
                <NavLink to={'/signin'} activeClassName="navSelected">Sign In</NavLink>
              </div>
              <div className="navItem">
                <NavLink to={'/register'} activeClassName="navSelected">Register</NavLink>
              </div>
            </>
          )
          :
          (
            <>
              <div className="navItem">
                <NavLink to={'/groups'} activeClassName="navSelected">My Groups</NavLink>
              </div>
              <div className="navItem">
                <NavLink to={'/favourites'} activeClassName="navSelected">My Favourites</NavLink>
              </div>
              <div className="navItem">
                <NavLink onClick={authSignout} to={'/'}>Sign Out</NavLink>
              </div>
            </>
          )
      }
      <div className="navItem">
        <NavLink to={'/contact'} activeClassName="navSelected">Contact us</NavLink>
      </div>
    </nav>
  )
}
export default Navbar;