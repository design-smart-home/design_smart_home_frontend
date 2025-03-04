import React from "react";

const Widget = ({title}) => {
    return (
        <div style={styles.widget}>
            <h3>{title}</h3>

        </div>
    );
};

const styles = {
    wiget: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

    },
};

export default Widget;