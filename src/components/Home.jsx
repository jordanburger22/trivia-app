import { useNavigate } from "react-router-dom";


function Home() {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/quiz');
    }


    return (
        <div className="home-container">
            <h1>Welcome to the Trivia App!</h1>
            <p>
                Test your knowledge with random trivia questions from various categories and difficulties.
            </p>
            <p>
                Challenge yourself and see how many questions you can answer correctly!
            </p>
            <p>
                Click the button below to start your quiz and see how you rank!
            </p>
            <div>
                <button onClick={handleNavigate}>Start Quiz</button>
            </div>
        </div>
    );
}

export default Home;
