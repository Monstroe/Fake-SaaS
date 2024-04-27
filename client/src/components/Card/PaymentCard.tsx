import React from 'react'

interface PaymentCardProps {
    UserID: number,
    CardID: number,
    CardHolder: string,
    CardNumber: string,
    CVV: string,
    ExpDate: string,
    Address: string,
    City: string,
    State: string,
    ZipCode: string
}

function PaymentCard(card: PaymentCardProps) {
    const [newCard, setNewCard] = React.useState<PaymentCardProps>(card);

    function HandleUpdate() {
        fetch(`/payment/update/${card.UserID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newCard)
        })
            .then(async res => {
                if (res.status === 200) {
                    alert('Payment updated successfully');
                }
                else if (res.status === 201) {
                    alert('Payment added successfully');
                }
                else {
                    alert('Unable to update payment information');
                }
            })
            .then(err => { console.log(err); });
    }

    function HandleDelete() {
        fetch(`/payment/delete/${card.UserID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ CardID: card.CardID })
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
        <div className='border border-1 border-dark p-3 rounded-2 bg-dark-subtle m-2 col-5'>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="cardholder" className='form-label'><strong>Card Holder</strong></label>
                </div>
                <div className='col'>
                    <input type="text" id="cardholder" placeholder="Enter card holder's name" value={newCard.CardHolder} onChange={e => setNewCard({ ...newCard, CardHolder: e.target.value })} name="CardHolder" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="cardnumber" className='form-label'><strong>Card Number</strong></label>
                </div>
                <div className='col'>
                    <input type="text" id="cardnumber" placeholder="Enter card number" value={newCard.CardNumber} onChange={e => setNewCard({ ...newCard, CardNumber: e.target.value })} name="CardNumber" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="cvv" className='form-label'><strong>CVV</strong></label>
                </div>
                <div className='col'>
                    <input type="text" id="cvv" placeholder='Enter CVV' value={newCard.CVV} onChange={e => setNewCard({ ...newCard, CVV: e.target.value })} name="username" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="expdate" className='form-label'><strong>Exp Date</strong></label>
                </div>
                <div className='col'>
                    <input type="date" id="expdate" placeholder='Enter expiration date' value={newCard.ExpDate.split('T')[0]} onChange={e => setNewCard({ ...newCard, ExpDate: e.target.value })} name="password" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="address" className='form-label'><strong>Address</strong></label>
                </div>
                <div className='col'>
                    <input type="text" id="address" placeholder='Enter billing address' value={newCard.Address} onChange={e => setNewCard({ ...newCard, Address: e.target.value })} name="address" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="city" className='form-label'><strong>City</strong></label>
                </div>
                <div className='col'>
                    <input type="text" id="city" placeholder='Enter city' value={newCard.City} onChange={e => setNewCard({ ...newCard, City: e.target.value })} name="city" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="state" className='form-label'><strong>State</strong></label>
                </div>
                <div className='col'>
                    <input type="text" id="state" placeholder='Enter state' value={newCard.State} onChange={e => setNewCard({ ...newCard, State: e.target.value })} name="state" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="zipcode" className='form-label'><strong>Zip Code</strong></label>
                </div>
                <div className='col'>
                    <input type="text" id="zipcode" placeholder='Enter zip code' value={newCard.ZipCode} onChange={e => setNewCard({ ...newCard, ZipCode: e.target.value })} name="zipcode" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>
            <button type='submit' onClick={HandleUpdate} className='btn btn-warning rounded-1 mt-3'>Update Payment</button>
            <button type='button' onClick={HandleDelete} className='btn btn-danger rounded-1 mt-3 ms-3'>Delete Payment</button>
        </div>
    )
}

export default PaymentCard