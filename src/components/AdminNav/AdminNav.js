import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <div className="d-flex bg-secondary text-start h-vh-100 p-4 flex-column">
            <h4>DailyFood Admin</h4>
            <div className="menu d-flex flex-column">
            <Link to="/" className="text-white my-3">View Site</Link>
        <Link to="/admin/manageProducts" className="text-white my-3">Manage Products </Link>
        <Link to="/admin" className="text-white my-3">Add Product </Link>
            </div>
     
        </div>
    );
};

export default AdminNav;