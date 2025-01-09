import { useContext, useState, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

function Quiz() {
    const { getQuestions, questions, saveAnswer, savedAnswers, resetQuestions } = useContext(QuizContext);

    const navigate = useNavigate();

    const [questionIndex, setQuestionIndex] = useState(0);

    // Define `currentQuestion` only when questions are available
    const currentQuestion = questions[questionIndex] || null;

    // Function to insert correct answers
    function insertCorrectAnswers(question) {
        const answers = [...question.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * 4);
        answers.splice(randomIndex, 0, question.correct_answer);
        return answers;
    }

    // State for answers
    const [answers, setAnswers] = useState([]);

    // Update answers whenever `currentQuestion` changes
    useEffect(() => {
        if (currentQuestion) {
            const shuffledAnswers = insertCorrectAnswers(currentQuestion);
            setAnswers(shuffledAnswers);
        }
    }, [currentQuestion]); // Dependency array ensures this runs only when `currentQuestion` changes

    const handleAnswerClick = (answer) => {
        saveAnswer(questionIndex, answer);
        setQuestionIndex(questionIndex + 1);
    };

    return (
        <div className="quiz-container">
            {questions.length === 0 && (
                <div>
                    <h1>Trivia Time!</h1>
                    <p>Test your knowledge with 10 random questions</p>
                    <button onClick={getQuestions}>Get Questions!</button>
                </div>
            )}
            {questions.length > 0 && currentQuestion && questionIndex < 10 && savedAnswers.length < 10 && (
                <div>
                    <h2>Question #{questionIndex + 1}</h2>
                    <div>
                        <p><strong>Category:</strong> {currentQuestion.category}</p>
                        <p><strong>Difficulty:</strong> {currentQuestion.difficulty}</p>
                    </div>
                    <div className="trivia-question">
                        <p><strong>Question:</strong> {currentQuestion.question}</p>
                        <div className="answer-container">
                            {answers.map((answer, index) => (
                                <div className="answer-div" onClick={() => handleAnswerClick(answer)} key={index}>{answer}</div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {savedAnswers.length === 10 && (
                <div className="quiz-completed">
                    <h1>Quiz Completed!</h1>
                    <p>You've completed the quiz.</p>
                    <button onClick={() => navigate('/results')}>Check Results</button>
                    <p>OR</p>
                    <button onClick={resetQuestions}>Try Again</button>
                </div>
            )}
        </div>
    );
}

export default Quiz;
