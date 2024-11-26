import { useState } from 'react'
import './App.css'
import Login from './component/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginDashbord from './component/LoginDashbord'
import SectionIncharge from './component/SectionIncharge'
import Draacedemic from './component/Draacedemic'
import Deanacedemic from './component/Deanacedemic'



function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState('');

  // Function to handle successful login
  const handleLogin = (adminss) => {
    setIsLoggedIn(adminss);
  };
  return (
    <>
     <BrowserRouter>
        <Routes>
          {isLoggedIn === 'Dealhandle' ? (
            <Route path='/dashboard' element={<LoginDashbord />} />
          ) 
          : isLoggedIn === 'sectionIncharge' ? (
            <Route path='/sectionInchargedashboard' element={<SectionIncharge />} />
          )
           : isLoggedIn === 'DraAcademic' ? (
            <Route path='/draAcademicdashboard' element={<Draacedemic/>} />
          )
          : isLoggedIn === 'DeanAcademic' ? (
           <Route path='/deanAcademicdashboard' element={<Deanacedemic/>} />
         )
          : (
            <Route path='/' element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>
      </BrowserRouter>
       </>
  )
}

export default App
