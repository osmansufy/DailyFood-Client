import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AdminPanel from './components/AdminPanel/AdminPanel';
import Home from './components/Home/Home';
import ManageProducts from './components/ManageProducts/ManageProducts';
import SignUp from './components/SignUp/SignUp';
import { createContext, useState } from 'react';
import CheckOut from './components/CheckOut/CheckOut';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Orders from './components/Orders/Orders';
export const UserContext = createContext();
export const SignInContext = createContext();
export const OrderContext=createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isSignIn, setIsSignIn] = useState(false);
  const [orderProducts,setOrderProducts]=useState()
  return (
    <div className="App">
       <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <SignInContext.Provider value={[isSignIn, setIsSignIn]}>
          <OrderContext.Provider value={[orderProducts,setOrderProducts]}>
      <Router>
          <Switch>
          <Route exact path="/">
  <Home />
          </Route>
          <PrivateRoute exact path="/admin">
            <AdminPanel />
          </PrivateRoute>
          <PrivateRoute exact path="/orders">
            <Orders />
          </PrivateRoute>
          <Route exact path="/login">
           <SignUp />
          </Route>
          
          <PrivateRoute exact path="/checkOut">
           <CheckOut />
          </PrivateRoute>
        <Route exact path="/admin/manageProducts">
          <ManageProducts />
        </Route>
        </Switch>
      
    </Router>
    </OrderContext.Provider>
    </SignInContext.Provider>
    </UserContext.Provider>
    </div>
  );
}

export default App;
