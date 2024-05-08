import { useState, useEffect } from "react"
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import './Login.css'

function Login() {
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const { user } = useOutletContext();

  function handleSubmit(event) {
    event.preventDefault()
    const data = {
      'username': event.target.username.value,
      'password': event.target.password.value,
    }

    fetch('http://127.0.0.1:5555/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(resp => {
      if (resp.ok) {
        setMsg('Log in successful!')
      } else {
        setMsg('Log in failed!')
        return Promise.reject(resp)
      }
    })
    .catch(resp => resp.json())
    .then(data => setError(data))
  }

  const errorElement = error ? <p style={{color: 'red'}}>{error.error}</p> : null

  return (
    <div className="login-container">
   
    {msg ? <p>{msg}</p> : null}
    {errorElement}
    <form onSubmit={handleSubmit}>
      <label>Username: </label>
      <input type="text" name="username" className="input-text" /><br />
      <label>Password: </label>
      <input type="password" name="password" className="input-text"/><br />
      <input type="submit" className="submit" />
    </form>
  
    </div>
  )
}


export default Login