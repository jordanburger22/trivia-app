import { createContext, useState } from "react";
import axios from "axios";

export const QuizContext = createContext();

function QuizProvider({ children }) {
    const [questions, setQuestions] = useState([]);
    const [savedAnswers, setSavedAnswers] = useState([]);

    // Utility function to decode HTML entities
    function decodeHTMLEntities(text) {
        const parser = new DOMParser();
        return parser.parseFromString(text, 'text/html').body.textContent;
    }

    // Decode the entire array of questions
    const decodeQuestions = (questions) => {
        return questions.map((question) => ({
            ...question,
            question: decodeHTMLEntities(question.question),
            correct_answer: decodeHTMLEntities(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map(decodeHTMLEntities),
        }));
    };

    const getQuestions = async () => {
        try {
            const res = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
            // Decode the fetched questions
            const decodedQuestions = decodeQuestions(res.data.results);
            setQuestions(decodedQuestions);
        } catch (error) {
            console.log(error);
        }
    };

    const saveAnswer = (questionIndex, answer) => {
        setSavedAnswers(prev => [...prev, { questionIndex, answer }]);
    };

    const resetQuestions = () => {
        setQuestions([]);
        setSavedAnswers([]);
    };

    return (
        <QuizContext.Provider value={{
            getQuestions,
            questions,
            saveAnswer,
            savedAnswers,
            resetQuestions
        }}>
            {children}
        </QuizContext.Provider>
    );
}

export default QuizProvider;
