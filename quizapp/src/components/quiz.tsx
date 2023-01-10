import React, { useState, useEffect } from'react';
import { AppDispatch} from '../store/store'
import store from '../store/store'
import { useDispatch, connect, useSelector } from 'react-redux'
import { RootState } from '../store/quiz/quiz-reducer'
import { Link } from "react-router-dom";

export interface IQuizPage {}

export interface ICurQuest {
category: string;
correct_answer: string;
difficulty: string;
incorrect_answers: string[];
question: string;
type: string;
}
export interface IAnswerCollection {
answer: string;
correct: string;
}

export const QuizPage = (props: IQuizPage) => {
    
    const [questionCount, setQuestionCount] = useState(0);
    const [finished, setFinished] = useState(false);
    // const [answ, setAnsw] = useState('');
    
    let answObj: Object[]
    const dispatch = useDispatch<AppDispatch>();
    let shuffled: string[] = []
    const questions: ICurQuest[] = useSelector<RootState, ICurQuest[]>((state: any) => state.quiz.questions)
    let answers: string[] = []
    const currentQuestion = questions[questionCount]
    
    const renderOptions = () => {
        console.log('rendering answers', currentQuestion);   
        if (currentQuestion !== undefined) {
            console.log('is not undefined', currentQuestion);
            currentQuestion.incorrect_answers.forEach(item => {
              answers.push(item)
            });
           answers.push(currentQuestion.correct_answer)
           shuffled = answers
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
          }
        console.log('shuffled', shuffled);
    } 
    renderOptions();

  const setNext = () => {
    if (questions[questionCount]) {
        console.log('answ:', 'correct_answer', questions[questionCount].correct_answer);
        
      setQuestionCount(questionCount + 1)
      console.log(questionCount);
      
    } else {
      setFinished(true)
      console.log('finished', finished);
    }
    }
    const setAnsw = (ans: any) => {   
             
        console.log('setting answer', atob(ans), 'corAns', atob(currentQuestion.correct_answer));
        let obj: IAnswerCollection = {answer: atob(ans), correct: atob(currentQuestion.correct_answer)}
        console.log('obj', obj);
        // if (answObj[questionCount]) {
        //     console.log('removing', questionCount);
            
        //     answObj.splice(questionCount, 1)   
        // }
        answObj = [...answObj, obj]
        console.log(answObj);
         
    }

    return (
        <div>
            <p>
            QuizPage
            </p>
            { Object.keys(questions).length && questions[questionCount] ? 
            <div> 
            
            {atob(questions[questionCount].question)}

            <ul className="answer-list">
    {shuffled.map((answer, index) => (  
          <li key={index}>  
  <input onClick={() => setAnsw(answer)}
     type="button"
     className="answers"
     value={atob(answer)}
     name="answer"
     />
          </li>  
        ))}
    </ul>
    <button>Privious</button>
    {questionCount}
    <span onClick={setNext}>next</span>
            </div>
          
            :
            <div>
             <nav>
            <Link to="/">Go back</Link>
          </nav>
            </div>
          }
     {finished ? <div><p>We are finished</p></div> : ''
      }
        </div>
    )
}