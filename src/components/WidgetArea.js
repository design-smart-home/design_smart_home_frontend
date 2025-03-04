import React from "react";
import Widget from './Widget';

const WidgetArea = () => {
    return (
        <div style={StyleSheet.WidgetArea}>
            <Widget title= "Виджет 1" />
            <Widget title= "Виджет 2" />
            <Widget title= "Виджет 3" />
        </div>
    );
};

const styles = {
    WidgetArea: {
        display: 'grid',
        grodTemplateColums: 'repeat(2, 1fr)',
        gap: '10px',
        padding: '20px',
    },
};

export default WidgetArea;