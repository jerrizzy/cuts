import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    const userInfo = {
        username: username,
        password: password
    };

    try {
        const response = await fetch('http://localhost:5555/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userInfo)
        });

        if (!response.ok) {
            const errorData = await response.json();
            setMsg('Login failed: ' + (errorData.error || 'Unauthorized'));
            setError('Invalid credentials');
        } else {
            const userData = await response.json();
            
            if (userData.message === 'You are already logged in') {
                setMsg('You are already logged in');
                setError('You are already logged in');
                // Optionally, perform navigation or other actions here
            } else {
                // Update the logged-in user state with the user data
                // setUser(userData.user);
                navigate('/barbers');
                window.location.reload();
                setMsg('Login successful');
                setError('');

            }
        }
    } catch (error) {
        console.error('Login error:', error.message);
        setError('An error occurred during login');
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
        setError('Username and password are required');
        setMsg('');
        return;
    }

    await handleLogin();
};

  const errorElement = error ? <p style={{color: 'red'}}>{error}</p> : null

  return (
    <div className="login-container">
   
    {msg ? <p>{msg}</p> : null}
    {errorElement}
    <form onSubmit={handleSubmit}>
      <label>Username: </label>
      <input type="text" name="username" className="input-text" value={username} onChange={(e) => setUsername(e.target.value)}/><br />
      <label>Password: </label>
      <input type="password" name="password" className="input-text" value={password} onChange={(e) => setPassword(e.target.value)}/><br />
      <input type="submit" className="submit" />
    </form>
  
    </div>
  )
}


export default Login