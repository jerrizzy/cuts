import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import './App.css';

function App() {


  const [barbers, setBarbers] = useState([])

  // fetching barbers from backend
  useEffect(() => {
    console.log('fetching barbers');
    fetch('http://localhost:5555/barbers')
     .then(res => res.json())
     .then(data => setBarbers(data))
  }, [barbers])

  console.log(barbers)

  return (
    <div>
      
      <header>
        <NavBar />     
      </header>
      
      <main>
        <Outlet context={{ barbers, setBarbers }} />
      </main>
     
    </div>
  )
}

export default App
