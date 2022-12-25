import {useState} from "react";
import { useDispatch} from "react-redux";
import { addQuestions } from '../store/quiz/quiz-actions'
import {
    Link,
  } from "react-router-dom";
  import { AppDispatch } from '../store/store'

export interface IHomePage {}

export interface ITarget {
    target: HTMLSelectElement;
}

export const HomePage = (props: IHomePage) => {

    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'easy', text: 'easy'},
        {value: 'medium', text: 'medium'},
        {value: 'hard', text: 'hard'},
      ];
    
      const [selected, setSelected] = useState(options[0].value);
      const [questions, setQuestions] = useState([]);
      const dispatch = useDispatch<AppDispatch>();


    const getData = (event: ITarget) => {
        console.log('targetvalue ', event.target.value);
        setSelected(event.target.value);
        console.log('selected', selected);
        let api =  `https://opentdb.com/api.php?amount=10&category=23&difficulty=${event.target.value}&type=multiple`
        console.log('api', api);
        fetch(`${api}`)
        .then(res => res.json()) 
        .then(result => {
          console.log('we are here ', result);
          setQuestions(result.results)
          dispatch(addQuestions(result.results))
        })
      }

    return (
        <div>
            <select value={selected} onChange={getData}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
       
      {questions.length ?
        <h2>
         <nav>
        <Link to="quiz">Quiz</Link>
      </nav>
        </h2> : ''
      }
        </div>
    )
}