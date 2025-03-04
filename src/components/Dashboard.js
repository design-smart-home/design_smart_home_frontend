import React from 'react';
import DataControlPanel from './DataControlPanel';
import WidgetArea from './WidgetArea';

const Dashboard = () => {
    return (
        <div style={styles.dashboard}>
            <DataControlPanel />
            <WidgetArea />
        </div>
    );
};

const styles = {
    dashboard: {
        fontFamily: 'Arial, sans-serif'
    },
};

export default Dashboard;