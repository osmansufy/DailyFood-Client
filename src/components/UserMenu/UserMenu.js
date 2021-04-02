import React, { useContext } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { SignInContext, UserContext } from '../../App';
import firebase from "../../firebaseConfig";
const UserMenu = (props) => {
    const {userName}=props
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isSignIn, setIsSignIn] = useContext(SignInContext);
    const onLogout=()=>{
      
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          setLoggedInUser({name:"",email:""})
          setIsSignIn(false)
        }).catch((error) => {
          // An error happened.
        });
      }
    return (
        <div>
        <DropdownButton id="dropdown-basic-button" title={userName}>
  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
</DropdownButton>    
        </div>
    );
};

export default UserMenu;