import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { Link, useNavigate } from "react-router-dom";



function Results() {

    const { savedAnswers, questions, resetQuestions } = useContext(QuizContext);

    const navigate = useNavigate();

    const questionElements = questions.map((question, i) => {

        const isAnswerCorrect = savedAnswers[i]?.answer === question.correct_answer;

        return (
            <div className={`question`} key={i}>
                <h3>{question.question}</h3>
                <p>Your Answer: {savedAnswers[i]?.answer || 'Not Answered'}</p>
                <p className={`${isAnswerCorrect ? 'true' : 'false'}`}>Correct Answer: {question.correct_answer}</p>
            </div>
        )
    })

    function checkAnswer() {
        const correctAnswers = savedAnswers.filter((answer, i) => answer.answer === questions[i].correct_answer);
        return correctAnswers.length;
    }

    function resetQuiz() {
        resetQuestions();
        navigate('/quiz');
    }

    return (
        <div className="results-container">
            {savedAnswers.length === 0 &&
                <div>
                    <p>Go to the <Link to='/quiz'><button>Trivia Quiz</button></Link> and answer all the questions to get a score.</p>
                </div>
            }
            {
                savedAnswers.length > 0 && savedAnswers.length !== questions.length &&
                <div>
                    <p>You have not answered all the questions. Go back to the <button>Trivia Quiz</button> and answer all the questions to get a score.</p>
                </div>
            }
            {
                savedAnswers.length === questions.length && questions.length > 0 &&
                <div>
                    <div className="results-header">
                        <h2>Results</h2>
                        <p>You got {checkAnswer()} out of {questions.length} questions correct!</p>
                    </div>
                    <div className="results-questions">
                        {questionElements}
                    </div>
                    <button onClick={resetQuiz}>Try Again</button>
                </div>
            }
        </div>
    );
}

export default Results;