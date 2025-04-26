import React from 'react';
import { Button } from 'antd';


const EmptyDashboard = ({ onCreateDashboard }) => {
    return (
        <div className="empty-dashboard">
            <h1>Dashboard</h1>
            <p>Создай Dashboard для просмотра метрик и контроля устройств</p>
            <Button type="primary" onClick={onCreateDashboard}>
                + Создать Dashboard
            </Button>
        </div>
    );
};

export default EmptyDashboard;