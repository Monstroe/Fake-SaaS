import React, { useEffect } from 'react'

interface AlertProps {
    type: 'success' | 'danger' | 'warning'
    message: string
    duration?: number
}

function Alert({ type, message, duration = 5000 }: AlertProps) {
    const [show, setShow] = React.useState(true);

    useEffect(() => {
        const alert = document.querySelector('.alert');
        const timer = setTimeout(() => {
            alert?.classList.add('fade')
            alert?.classList.remove('show')
        }, duration);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='fixed-top d-flex align-items-center justify-content-center'>
            <div className={`alert alert-${type} alert-dismissible show w-25 m-2 text-center`} role="alert">
                {message}
            </div>
        </div>
    )
}

export default Alert