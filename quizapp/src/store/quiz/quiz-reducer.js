import * as actionTypes from './quiz-types';
import { createStore } from 'redux';


// initial state to store
const INITAL_STATE = {
    questions: [],
    questionCount: 0,
    answers: []
}



const quizReducer = (state = INITAL_STATE, action, props) => {
    switch (action.type) {

        case actionTypes.ADD_QUESTIONS:
            return { ...state, questions: action.payload }

        case actionTypes.INCREASE_QUESTION_COUNT:
            return { ...state, questionCount: state.questionCount + 1 }

        case actionTypes.DECREASE_QUESTION_COUNT:
            if (state.questionCount !== 0) {
                return { ...state, questionCount: state.questionCount - 1 }
            }
            
 case actionTypes.ADD_ANSWER:
     if(!state.answers.includes(action.payload)) {
        return {
            ...state,
            answers:  [...state.answers, action.payload]
        }
     }

        default:
            return state;
    }
}
const store = createStore(quizReducer);
export type RootState = ReturnType<typeof store.getState>;
export default quizReducer;