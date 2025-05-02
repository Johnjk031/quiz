import React, { useState, useEffect } from "react";
 import { database } from "./../firebaseConfig";
 import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signOut 
 } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function UserInfo() {

    const auth = getAuth();
    const [user, setUser] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("User is signed in to user-info component: ", user);
            setUser(user.email?.split('@')[0] || '');
          } else {
            console.log("User is signed out");
          }
        });
      
        return () => unsubscribe();
      }, []);

  return (
    <div className="App">
      <p>Welcome {user}</p>
    </div>
  );
}
export default UserInfo;
