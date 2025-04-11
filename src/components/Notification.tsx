import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification:React.FC = () =>
{
    return (
        <>
            <ToastContainer 
            position="top-center"
            autoClose={2000}
            />
        </>
    )
}

export default Notification;