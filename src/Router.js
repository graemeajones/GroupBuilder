import { Route, Redirect, Switch } from 'react-router-dom';
import AuthProvider from './components/contexts/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/pages/ProtectedRoute';
import Home from './components/pages/Home';
import Register from './components/pages/Register/Register';
import Signin from './components/pages/Signin';
import MyGroups from './components/pages/MyGroups/MyGroups';


function Router() {
  // Properties ----------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <AuthProvider>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
          <ProtectedRoute path='/groups'>
            <MyGroups />
          </ProtectedRoute>
          <Route path='*'>
            <Route render={ ({ location }) => <Redirect to={{ pathname: '/', state: { from: location } }}/> }/>
          </Route>
        </Switch>
      </Layout>
    </AuthProvider>
  );
}



export default Router;
