import * as actionTypes from './quiz-types'

export const addQuestions = (question) => {
    return {
        type: actionTypes.ADD_QUESTIONS,
        payload: question
    };
};
export const addAnswer = (ans) => {
    return {
        type: actionTypes.ADD_ANSWER,
        payload: ans
    };
};
export const nextQuestion = () => {
    return {
        type: actionTypes.INCREASE_QUESTION_COUNT,
    };
};
export const prevQuestion = () => {
    return {
        type: actionTypes.DECREASE_QUESTION_COUNT,
    };
};

