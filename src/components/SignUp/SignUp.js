import React, { useContext, useRef, useState } from "react";

import firebase from "../../firebaseConfig";

import { useHistory, useLocation } from "react-router";
import { Button, Container } from "react-bootstrap";
import MenuBar from "../MenuBar/MenuBar";
import { SignInContext, UserContext } from "../../App";

const SignUp = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const is_valid_email = (email) => /(.+)@(.+){2,}\.(.+){2,}/.test(email);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isSignIn, setIsSignIn] = useContext(SignInContext);

  const [user, setUser] = useState({
    newAccount: true,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    newUser: false,
    error: "",
  });
  const [values, setValues] = useState({
    showPassword: false,
    confirmPassword: false,
  });

  const handleClickShowPassword = (change) => {
    if (change == "password") {
      setValues({ ...values, showPassword: !values.showPassword });
    } else if (change == "confirmPassword") {
      setValues({ ...values, confirmPassword: !values.confirmPassword });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    const newUserInfo = {
      ...user,
    };
    //debugger;
    // perform validation
    let isValid = true;
    let formError = "";
    if (e.target.name === "email") {
      isValid = is_valid_email(e.target.value);
      if (!isValid) {
        formError = "Email Should be valid";
      } else {
        formError = "";
      }
    }
    if (e.target.name === "password") {
      isValid = e.target.value.length > 6;
      if (!isValid) {
        formError = "Password Should be more than  6 characters";
      } else {
        formError = "";
      }
    }
    if (e.target.name === "confirmPassword") {
      isValid = e.target.value === user.password;
      console.log(e.target.value, user.password, isValid);
      if (!isValid) {
        formError = "Password Should be match with confirm password";
      } else {
        formError = "";
      }
    }

    newUserInfo[e.target.name] = e.target.value;
    newUserInfo.isValid = isValid;
    newUserInfo.error = formError;
    setUser(newUserInfo);
  };
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("user updated successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onSubmit = () => {
    console.log(user);
    if (user.isValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          updateUserName(user.name);
          setLoggedInUser({
            name: user.name,
            email: user.email,
          });
          setIsSignIn(true);
          storeToken();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const signUphandle = () => {
    console.log(user);
    setUser({ ...user, newAccount: !user.newAccount });
  };
  const provider = new firebase.auth.GoogleAuthProvider();
  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const userInfo = result.user;
        const createdUser = { ...user };
        createdUser.isSignedIn = true;
        createdUser.name = userInfo.displayName;
        createdUser.email = userInfo.email;
        setLoggedInUser({
          name: userInfo.displayName,
          email: userInfo.email,
        });
        setUser(createdUser);
        setIsSignIn(true);
        storeToken();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email);
      });
  };

  const signInUser = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        console.log(res);
        const createdUser = { ...user };
        createdUser.isSignedIn = true;
        const userInfo = res.user;
        setLoggedInUser({
          name: userInfo.displayName,
          email: userInfo.email,
        });
        createdUser.error = "";
        createdUser.name = userInfo.displayName;
        setUser(createdUser);
        setIsSignIn(true);
        storeToken();
      })
      .catch((err) => {
        console.log(err.message);
        const createdUser = { ...user };
        createdUser.isSignedIn = false;
        createdUser.error = err.message;
        setUser(createdUser);
      });
  };
  const storeToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        sessionStorage.setItem("token", idToken);
        history.replace(from);
      })
      .catch(function (error) {
        // Handle error
      });
  };
  console.log(user);
  return (
    <div>
      <MenuBar />
      {/* {user.isSignedIn && (
        <div>
          <p> Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
        </div>
      )} */}
      <Container >
      <div className="modal-dialog" >
      <div className="modal-content p-2">
        <div className="signUp">
          {user?.newAccount ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-floating mb-3">
                <input
                  value={user.name}
                  onChange={handleChange}
                  name="name"
                  type="text"
                  className="form-control"
                  id="floatingInput"
                />
                <label for="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={user.email}
                  onChange={handleChange}
                  name="name"
                  type="email"
                  className="form-control"
                  id="floatingInput"
                />
                <label for="floatingInput">Username/Email</label>
              </div>

              <div class="input-group mb-3">
                <input
                  name="password"
                  type={values.showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="password"
                
                />
                   <span     onClick={() =>
                          handleClickShowPassword("password")
                        } className="input-group-text" id="basic-addon2">
               { values.showPassword? <i class="fas fa-eye"></i> :
               <i class="fas fa-eye-slash"></i>
               }
                </span>
              </div>
              <div class="input-group mb-3">
                <input
                  name="confirmPassword"
                  type={values.confirmPassword ? "text" : "password"}
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="password"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span     onClick={() =>
                          handleClickShowPassword("confirmPassword")
                        } className="input-group-text" id="basic-addon2">
               { values.confirmPassword? <i class="fas fa-eye"></i> :
               <i class="fas fa-eye-slash"></i>
               }
                </span>
              </div>

              {user.error ? (
                <p style={{ color: "red", fontWeight: "bold" }}>{user.error}</p>
              ) : (
                ""
              )}
              <Button variant="success" onClick={onSubmit}>
                Create an account
              </Button>
            </form>
          ) : (
            <>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-floating mb-3">
                  <input
                    value={user.email}
                    onChange={handleChange}
                    name="name"
                    type="email"
                    className="form-control"
                    id="floatingInput"
                  />
                  <label for="floatingInput">Username/Email</label>
                </div>
                <div class="input-group mb-3">
                  <input
                    name="password"
                    type={values.showPassword ? "text" : "password"}
                    value={user.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="password"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <span class="input-group-text" id="basic-addon2">
                    @example.com
                  </span>
                </div>
                <Button variant="success" onClick={signInUser}>
                  Login
                </Button>
              </form>
            </>
          )}
          <h4 style={{ textAlign: "center" }}>
            {!user?.newAccount ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span>Do you have an account?</span>
                <a onClick={signUphandle} style={{ color: "#FF6E40" }}>
                  Create Account
                </a>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span>Already have an account?</span>
                <a onClick={signUphandle} style={{ color: "#FF6E40" }}>
                  Login
                </a>
              </div>
            )}
          </h4>
        </div>
        <Button
          variant="outline-success"
          color="light"
          onClick={googleSignIn}
     className="d-flex align-items-center w-100 justify-content-center"
        >
          <i className="fab fa-google-plus-g"></i> Continue with google account
        </Button>
        </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
