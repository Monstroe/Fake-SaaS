import React, { useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert/Alert';

function Login() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const registrationResult = params.get('registration');
    const errorMessage = params.get('error');
    const [loginError, setLoginError] = React.useState('');

    useEffect(() => {
        if (loginError) {
            setTimeout(() => {
                setLoginError('');
            }, 6000);
        }
    }, [loginError]);

    const [values, setValues] = React.useState({
        username: '',
        password: ''
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(async res => {
                if (res.status === 200) {
                    const data = await res.json();
                    const id = data.id;
                    const token = data.token;
                    localStorage.setItem('token', await token);
                    navigate(`/profile/${id}/user`);
                } else {
                    setLoginError("Unable to log in");
                }
            })
            .then(err => { console.log(err); });
    }

    return (
        <div>
            {registrationResult === 'success' && (
                <Alert type='success' message='Registration successful!' />
            )}
            {registrationResult === 'failure' && (
                <Alert type='danger' message={`Registration failed. ${errorMessage && decodeURIComponent(errorMessage)}`} />
            )}
            {loginError && (
                <Alert type='danger' message={`Error: ${loginError}`} />
            )}

            <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
                <div className='p-4 w-25 bg-light rounded rounded-2 border border-1'>
                    <h2>Log-In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="text"><strong>Username</strong></label>
                            <input type="text" placeholder='Enter username' name="username" onChange={e => setValues({ ...values, username: e.target.value })} className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" placeholder='Enter password' name="password" onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                        </div>
                        <button type='submit' className='btn btn-success w-25 rounded-0'>Log-In</button>
                        <p className='pt-2'>Don't have an account? Click <Link to='/register'>here</Link> to create one!</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login