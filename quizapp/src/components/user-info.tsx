import React, { useState } from "react";
 import { database } from "./../firebaseConfig";
 import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
 } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function UserInfo() {

  return (
    <div className="App">
      <p>User login works</p>
    </div>
  );
}
export default UserInfo;
