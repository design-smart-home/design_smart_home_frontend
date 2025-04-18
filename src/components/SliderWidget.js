import React from 'react';
import { Slider } from 'antd';

const SliderWidget = () => {
  return (
    <div className="widget">
      <h3>Слайдер</h3>
      <Slider defaultValue={30} />
    </div>
  );
};

export default SliderWidget;