import React, { useState } from "react";
 import { database } from "./../firebaseConfig";
 import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
 } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function User() {
  const [loginPage, setLogin] = useState(false);

  const history = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    if (type === "signup") {
       createUserWithEmailAndPassword(database, email, password)
         .then((data) => {
           console.log(data, "authData");
           history("/");
         })
         .catch((err) => {
           alert(err.code);
           setLogin(true);
         });
    } else {
       signInWithEmailAndPassword(database, email, password)
         .then((data) => {
           console.log(data, "authData");
           history("/");
         })
         .catch((err) => {
           alert(err.code);
         });
    }
  };


  return (
    <div className="App">
      <div className="row">
        {
          <div
          className={loginPage ? "activeColor" : "pointer"}
          onClick={() => setLogin(!loginPage)} // Toggle the loginPage state
        >
          {!loginPage ? "Log in" : "Don't have an account? Sign up"}
        </div>
        }
        
      </div>
      <h1>{loginPage ? "Sign in" : "Sign up"}</h1>
      <form onSubmit={(e) => handleSubmit(e, loginPage ? "signin" : "signup")}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="password" placeholder="Password" />
        <br />
        <br />
        <button>{loginPage ? "SignIn" : "SignUp"}</button>
      </form>
    </div>
  );
}
export default User;
