import React, { useState } from 'react'

interface UpdateCard {
    UpdateDescription: string,
    Plan: number
}

function UpdateCard() {
    const [newUpdate, setNewUpdate] = useState<UpdateCard>({
        UpdateDescription: '',
        Plan: 0
    });

    function HandleUpdate() {
        fetch(`/update/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newUpdate)
        })
            .then(async res => {
                if (res.status === 201) {
                    alert('Update added successfully');
                    window.location.reload();
                }
                else {
                    alert('Unable to add update');
                }
            })
            .then(err => { console.log(err); });
    }

    function HandleDelete() {
        window.location.reload();
    }

    return (
        <div className='border border-1 border-dark p-3 rounded-2 bg-dark-subtle m-2 col-5'>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="description" className='form-label'><strong>Update Description</strong></label>
                </div>
                <div className='col'>
                    <input type="text" id="description" placeholder="Enter update description" onChange={e => setNewUpdate({ ...newUpdate, UpdateDescription: e.target.value })} name="UpdateDescription" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <label htmlFor="plan" className='form-label'><strong>Plan</strong></label>
                </div>
                <div className='col'>
                    <input type="number" id="plan" placeholder="Enter plan number" onChange={e => setNewUpdate({ ...newUpdate, Plan: parseInt(e.target.value) })} name="Plan" className='form-control form-control-sm rounded-1 border-0 border-bottom border-2 bg-white' />
                </div>
            </div>

            <button type='submit' onClick={HandleUpdate} className='btn btn-warning rounded-1 mt-3'>Add Update</button>
            <button type='button' onClick={HandleDelete} className='btn btn-danger rounded-1 mt-3 ms-3'>Delete Update</button>
        </div>
    )
}

export default UpdateCard