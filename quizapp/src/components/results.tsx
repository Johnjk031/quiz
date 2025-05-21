import {useState} from "react";
import { useDispatch} from "react-redux";
import { addQuestions } from '../store/quiz/quiz-actions'
import { useNavigate } from 'react-router-dom';
import {
    Link,
  } from "react-router-dom";
  import { AppDispatch } from '../store/store'
  import axios from "axios";

export interface IHomePage {}

export const ResultPage = (props: any) => {
const navigate = useNavigate();

let correctAmount: number = 0
let amount = 0  
props?.answers?.forEach((result: any) => {  
 if (result.answer === result.correct) {
     amount ++;
     correctAmount = amount
     }
});

const handleAddScore = async () => {
  try {
    await axios.post("http://localhost:5000/api/userdata/alfredsmail/add-result", {
      score: correctAmount,
    });
    navigate("/userInfo");
  } catch (error) {
    console.error("Error adding score:", error);
  }
};

return (
        <div>
        Result is displayed here 
      <p>{correctAmount}</p> 
      <button onClick={handleAddScore}>Add to result</button>;
        </div>
    )
}