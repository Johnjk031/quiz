import React, { useState, useEffect } from'react';
import { AppDispatch} from '../store/store'
import store from '../store/store'
import { useDispatch, connect, useSelector } from 'react-redux'
import { RootState } from '../store/quiz/quiz-reducer'
import { Link } from "react-router-dom";
import { ResultPage } from './results';

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
const answersCollection: IAnswerCollection[] = [];
let chosenAnswer: string = ''

export const QuizPage = (props: IQuizPage) => {
    
    const [questionCount, setQuestionCount] = useState(0);
    const [finished, setFinished] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [shuffled, setShuffled] = useState(['']);
    const [answer, setChosenAnswer] = useState('');
    
    let isFirstQuestion: Boolean;
    
    // const [answ, setAnswObj] = useState([]);
    
    const dispatch = useDispatch<AppDispatch>();
    const questions: ICurQuest[] = useSelector<RootState, ICurQuest[]>((state: any) => state.quiz.questions)
    let answers: string[] = []
    const currentQuestion = questions[questionCount]
    
    const renderOptions = () => {
      
        
        if (questions[questionCount] !== undefined) {          
          questions[questionCount].incorrect_answers.forEach(item => {
              answers.push(item)
            });
           answers.push(questions[questionCount].correct_answer)
           setShuffled(answers
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value))
      }
  } 
  const setCurrentQuestionAnswer = () => {
    console.log('answersCollection[questionCount]?.answer ', answersCollection[questionCount]?.answer, ' count: ', questionCount);
    setChosenAnswer(answersCollection[questionCount]?.answer)
  }
  useEffect(() => {
    isFirstQuestion = true;
    renderOptions();
    setCurrentQuestionAnswer()
  }, [questionCount]);

      const setNext = () => {
      isFirstQuestion = false
      setNextDisabled(true)
    if (questions[questionCount + 1]) {      
      setQuestionCount(count => count + 1)          
    } else {
      setFinished(true)
    }
    }

    const setAnsw = (ans: any) => {
      console.log('ans ', ans);
      
      setNextDisabled(false)
      setChosenAnswer(ans)      
        let obj: IAnswerCollection = {answer: atob(ans), correct: atob(questions[questionCount].correct_answer)}
        if (!answersCollection[questionCount]) {
            answersCollection[questionCount] = obj;
        }
        else {
          answersCollection[questionCount] = obj;
        }
        chosenAnswer = atob(ans)
      }

    const decreaseCount = (state: any, props: any) => {
      return {...state, questionCount: state.questionCount - 1};
    }

    const setPrev = () => {  
  setQuestionCount(count => count - 1)
  // renderOptions();
}

    return (
        <div>
      { !finished ? 
      <div> 
      <div className="main-background">
      {atob(questions[questionCount]?.question)}
      </div>
      <ul className="answer-list">
  {shuffled.map((answer, index) => (  
    <li className="list-answers" key={index} onClick={() => setAnsw(answer)}>  
      <div className="answer-span">
        <input
          type="button"
          className={`answers ${atob(answer) === answersCollection[questionCount]?.answer ? 'answeredText' : ''}`}
          value={atob(answer)}
          name="answer"
        />
      </div>
    </li>  
  ))}
</ul>
    <div className="questionBtns">
     <button className="nextAndPrev" onClick={setPrev} disabled={questionCount === 0}>
     <svg className={"nextAndPrevSvg" + (questionCount === 0 ? 'disabled' : '')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
     </button>
    {String(questionCount + 1)}
    <button className="nextAndPrev" onClick={setNext} disabled={answersCollection[questionCount]?.answer === undefined}>
    <svg className={"nextAndPrevSvg" + (answersCollection[questionCount]?.answer === undefined ? 'disabled' : '')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
    </button>
    </div>
            </div>
            :
            <div>
             <nav>
            <Link to="/">Restart</Link>
          </nav>
          <div><p>Great job</p></div>
          <ResultPage answers={answersCollection} />
            </div>
          }
        </div>
    )
}