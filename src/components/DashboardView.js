import React from 'react';
import { Card, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const DashboardView = ({ dashboard, onEdit, onDelete }) => {
  return (
    <Card
      title={dashboard.name}
      style={{ width: 300, margin: '16px' }}
      actions={[
        <Button 
          type="text" 
          icon={<EyeOutlined />} 
          onClick={() => console.log('View', dashboard.id)}
        />,
        <Button 
          type="text" 
          icon={<EditOutlined />} 
          onClick={() => onEdit(dashboard)}
        />,
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => onDelete(dashboard.id)}
        />,
      ]}
    >
      <p>Количество виджетов: {dashboard.widgets.length}</p>
      <p>Создан: {new Date(dashboard.id).toLocaleDateString()}</p>
    </Card>
  );
};

export default DashboardView;