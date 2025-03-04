import React from 'react';

const DataControlPanel = () => {
    return (
        <div style={StyleSheet.dataControlPanel}>
            <span>Моточник Данных</span>
            <select>
                <option>Выбрать</option>

            </select>
            <span>Предустановленный временной интервал</span>
            <select>
                <option>Выбрать</option>
            </select>
        </div>
    );
};

const styles = {
    dataControlPanel: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        backgroundColor: "#f0f0f0",
        borderBottom: '1px solid #ccc',
    },
};

export default DataControlPanel;