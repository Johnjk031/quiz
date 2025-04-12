import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { database } from './firebaseConfig';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './components/home';
import { QuizPage } from './components/quiz';
import { User } from './components/user';
import { UserInfo } from './components/user-info';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {

const auth = getAuth();
const [logedin, setLogedin] = useState(false);
const [userOptionsOpen, setUserOptionsOpen] = useState(false);
const userOptionsRef = useRef<HTMLDivElement>(null);


const usersCollectionRef = collection(db, "userinfo");

useEffect(() => {
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    console.log("DATA: ", data)
  };

  getUsers();
}, []);
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (userOptionsRef.current && !userOptionsRef.current.contains(event.target as Node)) {
      setUserOptionsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
const handleClick = () =>{
  signOut(database)
}
const toggleUserOptions = () => {
  setUserOptionsOpen(!userOptionsOpen)
}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        setLogedin(true);
      } else {
        console.log("User is signed out");
        setLogedin(false);
      }
    });
  
    return () => unsubscribe();  // Clean up listener on unmount
  }, []);

  return (
    <Router>
      <div>
      <header className="header">
  <div className="user-options-container">
    <svg
      className="user"
      onClick={toggleUserOptions}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
    </svg>
    {userOptionsOpen && (
      <div ref={userOptionsRef} className="user-options">
        <ul>
        <li>
      <Link to="/">Home</Link>
    </li>
        {logedin && ( <li onClick={handleClick}>Sign out</li>)}
        {!logedin && (
    <li>
      <Link to="/user">Sign in</Link>
    </li>
  )}
    {logedin && (
    <li>
      <Link to="/user">Profile</Link>
    </li>
  )}
        <li>Beta</li>
        <li>Gamma</li>
        </ul>
      </div>
    )}
  </div>
</header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="user" element={<User />} />
          <Route path="userInfo" element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
