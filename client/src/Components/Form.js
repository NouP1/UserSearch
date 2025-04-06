import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

const Form = () => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await axios.post('http://localhost:3001/search', { email, number });
      setResults(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Произошла ошибка');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}
      style={{display:'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          alignContent: 'space-around'}}>
        <div>
          <label>Email:</label>
          <input
          style={{width:100}}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number:</label>
          <InputMask
          style={{width:100}}
            mask="99-99-99"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          >
            {(inputProps) => <input {...inputProps} />}
          </InputMask>
        </div>
         <button type="submit" style={{width:108, marginTop:10}}>Submit</button>
      </form> 
    
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {results.map((user, index) => (
          <div key={index}>
            <p>Email: {user.email}</p>
            <p>Number: {user.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;