import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/TopBar/TopBar';
import AdminSideBar from '../../components/SideBar/AdminSideBar';

interface PaymentsData {
    CardID: number,
    UserID: number,
    CardHolder: string,
    CardNumber: string,
    CVV: string,
    ExpDate: string,
    Address: string,
    City: string,
    State: string,
    ZipCode: string
}

function PaymentAdmin() {
    const navigate = useNavigate();
    const { UserID } = useParams();
    const [payments, setPayments] = useState<PaymentsData[]>([]);

    useEffect(() => {
        fetch(`/payment`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    const data = await res.json();
                    setPayments(data);
                }
                else {
                    alert('Unable to retrieve payment list');
                    navigate(`/profile/${UserID}/user`);
                }
            })
            .then(err => { console.log(err); });
    }, []);

    function handleDelete(id: number) {
        fetch(`/payment/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ UserID: UserID })
        })
            .then(async res => {
                if (res.status === 200) {
                    alert('Payment deleted successfully');
                    window.location.reload();
                }
                else {
                    alert('Unable to delete payment');
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
                        <h2>Payment List</h2>
                        <div className='d-flex flex-wrap justify-content-between m-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Actions</th>
                                        <th scope='col'>CardID</th>
                                        <th scope='col'>UserID</th>
                                        <th scope='col'>Card Holder</th>
                                        <th scope='col'>Card Number</th>
                                        <th scope='col'>CVV</th>
                                        <th scope='col'>Expiration Date</th>
                                        <th scope='col'>Address</th>
                                        <th scope='col'>City</th>
                                        <th scope='col'>State</th>
                                        <th scope='col'>Zip Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment: any) => (
                                        <tr key={payment.CardID}>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => handleDelete(payment.CardID)}>Delete</button>
                                            </td>
                                            <td>{payment.CardID}</td>
                                            <td>{payment.UserID}</td>
                                            <td>{payment.CardHolder}</td>
                                            <td>{payment.CardNumber}</td>
                                            <td>{payment.CVV}</td>
                                            <td>{payment.ExpDate}</td>
                                            <td>{payment.Address}</td>
                                            <td>{payment.City}</td>
                                            <td>{payment.State}</td>
                                            <td>{payment.ZipCode}</td>

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

export default PaymentAdmin