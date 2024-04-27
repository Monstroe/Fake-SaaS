import React from 'react'
import NavBar from '../../components/TopBar/TopBar'

interface ErrorProps {
    error: string
}

function Error({ error }: ErrorProps) {

    return (
        <div>
            <NavBar />
            <br />
            <div className='d-flex flex-column justify-content-center align-items-center p-lg-5'>
                <div className='d-flex w-100 justify-content-center'>
                    <h2>{error}</h2>
                </div>
            </div>
        </div>
    )
}

export default Error