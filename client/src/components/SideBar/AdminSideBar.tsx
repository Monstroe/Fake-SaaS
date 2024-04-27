import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface AdminSideBarProps {
    id: string | null
}

function AdminSideBar({ id }: AdminSideBarProps) {

    return (
        <div className='sidebar bg-transparent p-3'>
            <ul className="nav flex-column">
                <li className="nav-item nav-underline">
                    <Link to={`/admin/${id}/users`} className="nav-link text-dark text-end">User List</Link>
                </li>
                <li className="nav-item nav-underline">
                    <Link to={`/admin/${id}/payments`} className="nav-link text-dark text-end">Payment List</Link>
                </li>
                <li className="nav-item nav-underline">
                    <Link to={`/admin/${id}/updates`} className="nav-link text-dark text-end">Update List</Link>
                </li>
                <li className="nav-item nav-underline">
                    <Link to={`/profile/${id}/user`} className="nav-link text-dark text-end">Back</Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminSideBar