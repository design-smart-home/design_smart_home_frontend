import React from 'react';
import { Switch } from 'antd';

const SwitchWidget = () => {
  return (
    <div className="widget">
      <h3>Свитчер</h3>
      <Switch defaultChecked />
    </div>
  );
};

export default SwitchWidget;