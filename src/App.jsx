import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Quiz from './components/Quiz'
import Results from './components/Results'
import Navbar from './components/Navbar'

function App() {


  return (
    <div>
      <Navbar />
      <div className='main-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/results' element={<Results />} />
        </Routes>
      </div>
    </div>
  )
}

export default App