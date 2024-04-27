import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../../components/TopBar/TopBar';
import SideBar from '../../components/SideBar/SideBar';

interface UserData {
    FirstName: string,
    LastName: string,
    UserName: string,
    Password: string
}

function UserProfile() {
    const { UserID } = useParams();
    const [user, setUser] = useState({} as UserData);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/user/get/${UserID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    const data = await res.json();
                    setUser(await data);
                }
                else {
                    alert('Unable to retrieve user information')
                    navigate('/login')
                }
            })
            .then(err => { console.log(err); });
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch(`/user/update/${UserID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(user)
        })
            .then(async res => {
                if (res.status === 200) {
                    alert('User updated successfully');
                    navigate(`/profile/${UserID}/user`);
                }
                else {
                    alert('Unable to update user information');
                }
            })
            .then(err => { console.log(err); });
    }

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        fetch(`/user/delete/${UserID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    alert('User deleted successfully');
                    navigate('/login');
                }
                else {
                    alert('Unable to delete user');
                }
            })
            .then(err => { console.log(err); });
    }

    return (
        <div>
            <NavBar />
            <div className='d-flex flex-column justify-content-center align-items-center p-lg-5'>
                <h1 className='p-3'>Profile</h1>
                <div className='d-flex w-100 justify-content-center'>
                    <SideBar id={UserID ? UserID : null} />
                    <div className='p-4 w-25 bg-info-subtle rounded rounded-2 border border-1'>
                        <h2>User Information</h2>
                        <form onSubmit={handleSubmit} className='mx-5 p-4'>
                            <div className='row align-items-center mb-3'>
                                <div className='col'>
                                    <label htmlFor="firstname" className='form-label'><strong>First Name</strong></label>
                                </div>
                                <div className='col'>
                                    <input type="text" id="firstname" placeholder='Enter first name' value={user.FirstName} onChange={e => setUser({ ...user, FirstName: e.target.value })} readOnly={false} name="firstname" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                                </div>
                            </div>
                            <div className='row align-items-center mb-3'>
                                <div className='col'>
                                    <label htmlFor="lastname" className='form-label'><strong>Last Name</strong></label>
                                </div>
                                <div className='col'>
                                    <input type="text" id="lastname" placeholder='Enter last name' value={user.LastName} onChange={e => setUser({ ...user, LastName: e.target.value })} name="lastname" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                                </div>
                            </div>
                            <div className='row align-items-center mb-3'>
                                <div className='col'>
                                    <label htmlFor="username" className='form-label'><strong>Username</strong></label>
                                </div>
                                <div className='col'>
                                    <input type="text" id="username" placeholder='Enter username' value={user.UserName} onChange={e => setUser({ ...user, UserName: e.target.value })} name="username" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                                </div>
                            </div>
                            <div className='row align-items-center mb-3'>
                                <div className='col'>
                                    <label htmlFor="password" className='form-label'><strong>Password</strong></label>
                                </div>
                                <div className='col'>
                                    <input type="text" id="password" placeholder='Enter new password' onChange={e => setUser({ ...user, Password: e.target.value })} name="password" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                                </div>
                            </div>
                            <button type='submit' className='btn btn-success rounded-1 mt-3'>Update User</button>
                            <button type='button' onClick={handleDelete} className='btn btn-danger rounded-1 mt-3 ms-3'>Delete User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile