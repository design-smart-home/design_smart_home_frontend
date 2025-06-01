import React from 'react';
import { Card, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DashboardView = ({ dashboard, onEdit, onDelete }) => {
  return (
    <Card
      title={dashboard.name}
      style={{ width: 300, margin: '16px' }}
      actions={[
        <Link to={`/dashboard/${dashboard.id}/view`}>
          <Button type="text" icon={<EyeOutlined />} />
        </Link>,
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
      <p>Виджетов: {dashboard.widgets.length}</p>
      <p>Устройств: {dashboard.widgets.filter(w => w.deviceId).length}</p>
    </Card>
  );
};

export default DashboardView;