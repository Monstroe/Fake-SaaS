import React, { useEffect, useState } from 'react'
import NavBar from '../../components/TopBar/TopBar'
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideBar from '../../components/SideBar/AdminSideBar';

interface UsersData {
    UserID: number,
    UserName: string,
    FirstName: string,
    LastName: string,
    Plan: number,
    IsAdmin: number
}

function UserAdmin() {
    const navigate = useNavigate();
    const { UserID } = useParams();
    const [users, setUsers] = useState<UsersData[]>([]);

    useEffect(() => {
        fetch(`/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    const data = await res.json();
                    setUsers(data);
                }
                else {
                    alert('Unable to retrieve user list');
                    navigate(`/profile/${UserID}/user`);
                }
            })
            .then(err => { console.log(err); });
    }, []);

    function handleDelete(id: number) {
        fetch(`/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ UserID: UserID })
        })
            .then(async res => {
                if (res.status === 200) {
                    alert('User deleted successfully');
                    window.location.reload();
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
                <h1 className='p-3'>Admin Panel</h1>
                <div className='d-flex w-100 justify-content-center'>
                    <AdminSideBar id={UserID ? UserID : null} />
                    <div className='p-4 w-50 bg-info-subtle rounded rounded-2 border border-1'>
                        <h2>User List</h2>
                        <div className='d-flex flex-wrap justify-content-between m-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Actions</th>
                                        <th scope='col'>UserID</th>
                                        <th scope='col'>UserName</th>
                                        <th scope='col'>First Name</th>
                                        <th scope='col'>Last Name</th>
                                        <th scope='col'>Plan</th>
                                        <th scope='col'>Is Admin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: any) => (
                                        <tr key={user.UserID}>
                                            <td>
                                                {UserID != user.UserID ? <button onClick={e => handleDelete(user.UserID)} className='btn btn-danger'>Delete</button> : null}
                                            </td>
                                            <td>{user.UserID}</td>
                                            <td>{user.UserName}</td>
                                            <td>{user.FirstName}</td>
                                            <td>{user.LastName}</td>
                                            <td>{user.Plan}</td>
                                            <td>{user.IsAdmin}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAdmin