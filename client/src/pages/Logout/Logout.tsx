import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000);

        localStorage.removeItem('token');
    }, []);


    return (
        <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
            <div className='p-4 w-25'>
                <h1>You have been logged out. Redirecting to the home page</h1>
            </div>
        </div>
    )
}

export default Logout