import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => (
    <div className="sidebar">
        <nav>
            <Link to="/dashboard">Панель управления</Link>
        </nav>
    </div>
);

export default Sidebar;