import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.scss';


function Layout(props) {
  // Properties ----------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <>
      <Header />
      <Navbar />
      <div className="underlay">
        <main>
          {props.children}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
