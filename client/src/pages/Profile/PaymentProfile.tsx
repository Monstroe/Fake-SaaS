import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../../components/TopBar/TopBar';
import SideBar from '../../components/SideBar/SideBar';
import PaymentCard from '../../components/Card/PaymentCard';

interface PaymentData {
    CardID: number,
    CardHolder: string,
    CardNumber: string,
    ExpDate: string,
    CVV: string,
    BillingAddress: string,
    City: string,
    State: string,
    ZipCode: string
}

function PaymentProfile() {
    const { UserID } = useParams();
    const [payments, setPayments] = useState<PaymentData[]>([]);

    useEffect(() => {
        fetch(`/payment/get/${UserID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(async res => {
                const data = await res.json();
                setPayments(data);
            })
            .then(err => { console.log(err); });

    }, []);

    function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const newPayment = {
            CardID: -1,
            CardHolder: '',
            CardNumber: '',
            ExpDate: '',
            CVV: '',
            BillingAddress: '',
            City: '',
            State: '',
            ZipCode: ''
        };

        setPayments(payments => [...payments, newPayment]);
    }

    function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        fetch(`/payment/update/${UserID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(async res => {
                if (res.status === 201) {
                    alert('Payment added successfully');
                    window.location.reload();
                }
                else {
                    alert('Unable to add payment');
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
                    <div className='p-4 w-50 bg-info-subtle rounded rounded-2 border border-1'>
                        <h2>Payment Information</h2>
                        <div className='mx-5 p-4'>
                            <div className='d-flex flex-wrap justify-content-between'>
                                {payments.map((payment: any) => (
                                    <PaymentCard key={payment.CardID} UserID={UserID} {...payment} />
                                ))}
                            </div>
                            <button type='button' onClick={handleAdd} className='btn btn-success rounded-1 mt-3'>Add Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentProfile