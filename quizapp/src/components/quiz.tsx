import React, { useState, useEffect } from'react';
import { AppDispatch} from '../store/store'
import store from '../store/store'
import { useDispatch, connect, useSelector } from 'react-redux'
import { RootState } from '../store/quiz/quiz-reducer'

export interface IQuizPage {}
export interface ICurQuest {
category: string;
correct_answer: string;
difficulty: string;
incorrect_answers: string[];
question: string;
type: string;

}

export const QuizPage = (props: IQuizPage) => {
    
    const [questionCount, setQuestionCount] = useState(0);

    const [finished, setFinished] = useState(false)

    const dispatch = useDispatch<AppDispatch>();
    let shuffled
    const questions: ICurQuest[] = useSelector<RootState, ICurQuest[]>((state: any) => state.quiz.questions)
    console.log(questions, typeof questions);
 
    
    useEffect(()=>{
        /*
        Query logic
        */
    //     if (questions.length) {
    //    setCurrentQuestion(questions[questionCount])
    //   setTimeout(() => {
    //     console.log(currentQuestion);
    //   }, 3000);       
    //   }
    console.log(typeof questions, questions);
    
  }, []);

    return (
        <div>
            <p>
            QuizPage
            </p>
            {questions[questionCount].question}
        </div>
    )
}