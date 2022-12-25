import './App.css';
import React, { useEffect } from'react';
import { useDispatch, connect } from 'react-redux'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { HomePage } from "./components/home";
import { QuizPage } from "./components/quiz";
export interface IAppProps {};

const App = (props: IAppProps) => {
  return (
    <div>
  <header className="header"></header>
  <p>test</p>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="quiz" element={<QuizPage />} />
      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;