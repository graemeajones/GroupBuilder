import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.scss';


function Header() {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const { authUser } = useAuth();

  // Methods -------------------------------------
  // Prepare view --------------------------------
  // View ----------------------------------------
  return (
    <header>
      <div className="banner">
        <Link to={'/'}>
          <img src="https://img.icons8.com/ios-filled/50/000000/conference-call.png" alt="Icon showing group"/>
        </Link>
        <Link to={'/'}>
          <h1>GroupBuilder</h1>
        </Link>
        <div className="login">
          {authUser && <p>Welcome {authUser.UserFirstname}!</p>}
        </div>
      </div>
      <div className="navIcon navClosed">
        <img src="https://img.icons8.com/ios-filled/24/000000/menu.png" alt="Hamburger icon"/>
      </div>
    </header>
  )
}

export default Header;

