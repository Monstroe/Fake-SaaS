import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

interface SideBarProps {
    id: string | null
}

interface Token {
    id: number;
    username: string;
    permissions: number;
}

function SideBar({ id }: SideBarProps) {

    const [isAdmin, setIsAdmin] = React.useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        const decoded = jwtDecode(token) as Token;
        if (decoded.permissions >= 1) {
            setIsAdmin(true);
        }
    }, []);

    return (
        <div className='sidebar bg-transparent p-3'>
            <ul className="nav flex-column">
                <li className="nav-item nav-underline">
                    <Link to={`/profile/${id}/user`} className="nav-link text-dark text-end">User</Link>
                </li>
                <li className="nav-item nav-underline">
                    <Link to={`/profile/${id}/payment`} className="nav-link text-dark text-end">Payments</Link>
                </li>
                <li className="nav-item nav-underline">
                    <Link to={`/profile/${id}/update`} className="nav-link text-dark text-end">Updates</Link>
                </li>
                <li className="nav-item nav-underline">
                    <Link to={`/logout`} className="nav-link text-dark text-end">Log-Out</Link>
                </li>
                {isAdmin &&
                    <li className="nav-item nav-underline">
                        <Link to={`/admin/${id}/users`} className="nav-link text-dark text-end">Admin</Link>
                    </li>
                }
            </ul>
        </div>
    )
}

export default SideBar