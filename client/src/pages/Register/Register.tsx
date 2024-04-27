import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert/Alert';

function Register() {
  const [values, setValues] = React.useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  })
  const navigate = useNavigate()
  const [registerError, setRegisterError] = React.useState('');

  useEffect(() => {
    if (registerError) {
      setTimeout(() => {
        setRegisterError('');
      }, 6000);
    }
  }, [registerError]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!values.firstname || !values.lastname || !values.username || !values.password) {
      setRegisterError('Please fill out all fields');
      return;
    }

    fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(async res => {
        if (res.status === 201) {
          navigate('/login?registration=success');
        } else {
          const errorMessage = res.json().then(data => data.error);
          navigate(`/login?registration=failure&error=${encodeURIComponent(await errorMessage)}`);
        }
      })
      .then(err => { console.log(err); });
  }

  return (
    <div>
      {registerError && (
        <Alert type='danger' message={`Error: ${registerError}`} />
      )}
      <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
        <div className='p-4 w-25 bg-light rounded rounded-2 border border-1'>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="text"><strong>First Name</strong></label>
              <input type="text" placeholder='Enter first name' name="username" onChange={e => setValues({ ...values, firstname: e.target.value })} className='form-control rounded-0' />
            </div>
            <div className='mb-3'>
              <label htmlFor="text"><strong>Last Name</strong></label>
              <input type="text" placeholder='Enter last name' name="username" onChange={e => setValues({ ...values, lastname: e.target.value })} className='form-control rounded-0' />
            </div>
            <div className='mb-3'>
              <label htmlFor="text"><strong>Username</strong></label>
              <input type="text" placeholder='Enter username' name="username" onChange={e => setValues({ ...values, username: e.target.value })} className='form-control rounded-0' />
            </div>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Password</strong></label>
              <input type="password" placeholder='Enter password' name="username" onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
            </div>
            <button type='submit' className='btn btn-success w-25 rounded-0'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register