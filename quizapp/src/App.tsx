import './App.css';
import React, { useState } from 'react';
import { database } from './firebaseConfig';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './components/home';
import { QuizPage } from './components/quiz';
import { User } from './components/user';
import { UserInfo } from './components/user-info';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


function App() {

const auth = getAuth();
const [logedin, setLogedin] = useState(false);

const handleClick = () =>{
  signOut(database)
}
  // Add an observer to check the user's sign-in state
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log("User is signed in:", user);
      setLogedin(true)
    } else {
      // User is signed out
      console.log("User is signed out");
      setLogedin(false)
    }
  });

  return (
    <Router>
      <div>
        <header className="header">
          {logedin ? <button onClick={handleClick}>Sign out</button> : ''}
          <Link to="/user">
            <svg
              className="user"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </Link>
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
