import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'client',
    website: '',
    street: '',
    city: '',
    state: '',
    zip_code: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('http://localhost:5555/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      if (resp.ok) {
        navigate('/login');
      } else {
        const data = await resp.json();
        setError(data.errors || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
    }
  };

  const isBarber = formData.role === 'barber';

  return (
    <div className="login-container">
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type="text" name="username" className="input-text" value={formData.username} onChange={handleChange} /><br />
        <label>Password: </label>
        <input type="password" name="password" className="input-text" value={formData.password} onChange={handleChange} /><br />
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="client">Client</option>
          <option value="barber">Barber</option>
        </select><br />
        {isBarber && (
          <>
            <label>Website:</label>
            <input type="text" name="website" className="input-text" value={formData.website} onChange={handleChange} /><br />
            <label>Street:</label>
            <input type="text" name="street" className="input-text" value={formData.street} onChange={handleChange} /><br />
            <label>City:</label>
            <input type="text" name="city" className="input-text" value={formData.city} onChange={handleChange} /><br />
            <label>State:</label>
            <input type="text" name="state" className="input-text" value={formData.state} onChange={handleChange} /><br />
            <label>Zip:</label>
            <input type="text" name="zip_code" className="input-text" value={formData.zip_code} onChange={handleChange} /><br />
          </>
        )}
        <input type="submit" className="submit" />
      </form>
    </div>
  );
}

export default Signup;
