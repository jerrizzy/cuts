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
     .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
     .then(data => setBarbers(data))
     .catch(error => console.log('Error fetching barbers:', error));
  }, [])

  console.log(barbers)

  // this conditional statement is to prevent the app from crashing if there are no barbers
  // when we refresh the page, fetching takes a few seconds to return data but react renders the page
  // before the data is returned.
  // if there are no barbers, we return a loading message. otherwise the app would crash.
  if(barbers.length === 0) {
    return <h1> loading </h1>
 }

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
