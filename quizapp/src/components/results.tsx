import {useState} from "react";
import { useDispatch} from "react-redux";
import { addQuestions } from '../store/quiz/quiz-actions'
import { useNavigate } from 'react-router-dom';
import {
    Link,
  } from "react-router-dom";
  import { AppDispatch } from '../store/store'

export interface IHomePage {}

export const ResultPage = (props: any) => {

let correctAmount: number = 0
let amount = 0  
props?.answers?.forEach((result: any) => {  
 if (result.answer === result.correct) {
     amount ++;
     correctAmount = amount
     }
});
return (
        <div>
        Result is displayed here 
      <p>{correctAmount}</p> 
      <Link to="/userInfo">Add to result</Link>
        </div>
    )
}