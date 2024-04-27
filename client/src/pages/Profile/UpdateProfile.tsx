import React, { useEffect, useState } from 'react'
import NavBar from '../../components/TopBar/TopBar'
import SideBar from '../../components/SideBar/SideBar'
import { useParams } from 'react-router-dom';

interface UpdateData {
    UpdateID: number,
    DateReleased: string,
    UpdateDescription: string
}

function UpdateProfile() {
    const { UserID } = useParams();
    const [updates, setUpdates] = useState<UpdateData[]>([]);

    useEffect(() => {
        fetch(`/update/get/${UserID}`, {
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
                    alert('Unable to retrieve updates');
                }
            })
            .then(err => { console.log(err); });

    }, []);

    return (
        <div>
            <NavBar />
            <div className='d-flex flex-column justify-content-center align-items-center p-lg-5'>
                <h1 className='p-3'>Profile</h1>
                <div className='d-flex w-100 justify-content-center'>
                    <SideBar id={UserID ? UserID : null} />
                    <div className='p-4 w-50 bg-info-subtle rounded rounded-2 border border-1'>
                        <h2>Update Information</h2>
                        <div className='d-flex flex-wrap justify-content-between m-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Release Date</th>
                                        <th scope='col'>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {updates.map((update: any) => (
                                        <tr key={update.UpdateID}>
                                            <td>{update.DateReleased.split('T')[0]}</td>
                                            <td>{update.UpdateDescription}</td>
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

export default UpdateProfile