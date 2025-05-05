import React from 'react';
import { Switch } from 'antd';

const SwitchWidget = () => {
  return (
    <div className="switch-widget">
      <h3>Свитчер</h3>
      <Switch className="widget-control" defaultChecked />
    </div>
  );
};

export default SwitchWidget;