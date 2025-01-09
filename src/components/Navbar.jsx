import { useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(`${path}`);
    }


    return (
        <nav>
            <h1>Trivia App</h1>
            <div className="nav-buttons">
                <button onClick={() => handleNavigate('/')}>Home</button>
                <button onClick={() => handleNavigate('/quiz')}>Trivia Quiz</button>
                <button onClick={() => handleNavigate('/results')}>Results</button>
            </div>
        </nav>
    );
}

export default Navbar;