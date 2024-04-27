import React, { useEffect, useState } from 'react'
import NavBar from '../../components/TopBar/TopBar'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import UpdateCard from '../../components/Card/UpdateCard';
import { useNavigate, useParams } from 'react-router-dom';

interface UpdatesData {
    UpdateID: number,
    DateReleased: string,
    UpdateDescription: string,
    Plan: number
}

function UpdateAdmin() {
    const navigate = useNavigate();
    const { UserID } = useParams();
    const [updates, setUpdates] = useState<UpdatesData[]>([]);
    const [updateCard, setUpdateCard] = useState(false);

    useEffect(() => {
        fetch(`/update`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    const data = await res.json();
                    setUpdates(data);
                }
                else {
                    alert('Unable to retrieve update list');
                    navigate(`/profile/${UserID}/user`);
                }
            })
            .then(err => { console.log(err); });
    }, []);

    function handleAdd() {
        setUpdateCard(true);
    }

    return (
        <div>
            <NavBar />
            <div className='d-flex flex-column justify-content-center align-items-center p-lg-5'>
                <h1 className='p-3'>Admin</h1>
                <div className='d-flex w-100 justify-content-center'>
                    <AdminSideBar id={null} />
                    <div className='p-4 w-50 bg-info-subtle rounded rounded-2 border border-1'>
                        <h2>Update List</h2>
                        <div className='d-flex flex-wrap justify-content-between m-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Release Date</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Plan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {updates.map((update: any) => (
                                        <tr key={update.UpdateID}>
                                            <td>{update.DateReleased.split('T')[0]}</td>
                                            <td>{update.UpdateDescription}</td>
                                            <td>{update.Plan}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {!updateCard ? <button type='button' onClick={handleAdd} className='btn btn-success rounded-1 mt-3 ms-3'>Add Update</button> : <UpdateCard />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateAdmin