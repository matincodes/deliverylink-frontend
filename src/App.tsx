import Login from './routes/login';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import SignUp from './routes/sign-up';
import Home from './components/home';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
